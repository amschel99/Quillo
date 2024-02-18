use super::stable::State;
use super::types::{
    Balance, CancelOrderReceipt, DepositErr, DepositReceipt, Order, OrderId, OrderPlacementReceipt,
    WithdrawReceipt,
};
use super::utils::*;
use super::TOKEN;
use super::{exchange::*, stable};
use crate::dex::types::WithdrawErr;
use candid::{candid_method, export_service, Nat, Principal};
use ic_cdk::caller;
use ic_ledger_types::{
    AccountIdentifier, Memo, Tokens, DEFAULT_SUBACCOUNT, MAINNET_LEDGER_CANISTER_ID,
};
use std::cell::RefCell;
use std::convert::TryInto;

const ICP_FEE: u64 = 10_000;

thread_local! {
    pub static STATE: RefCell<State> = RefCell::new(State::default());
}

pub struct Type {}

#[ic_cdk::update]
#[candid_method(update)]
pub async fn deposit(token_canister_id: Principal) -> DepositReceipt {
    let caller = caller();
    let ledger_canister_id = STATE
        .with(|s| s.borrow().ledger)
        .unwrap_or(MAINNET_LEDGER_CANISTER_ID);

    let amount = if token_canister_id == ledger_canister_id {
        deposit_icp(caller).await?
    } else {
        deposit_token(caller, token_canister_id).await?
    };
    STATE.with(|s| {
        s.borrow_mut()
            .exchange
            .balances
            .add_balance(&caller, &token_canister_id, amount.to_owned())
    });
    DepositReceipt::Ok(amount)
}

async fn deposit_icp(caller: Principal) -> Result<Nat, DepositErr> {
    let canister_id = ic_cdk::api::id();
    let ledger_canister_id = STATE
        .with(|s| s.borrow().ledger)
        .unwrap_or(MAINNET_LEDGER_CANISTER_ID);

    let account = AccountIdentifier::new(&canister_id, &principal_to_subaccount(&caller));

    let balance_args = ic_ledger_types::AccountBalanceArgs { account };
    let balance = ic_ledger_types::account_balance(ledger_canister_id, balance_args)
        .await
        .map_err(|_| DepositErr::TransferFailure)?;

    if balance.e8s() < ICP_FEE {
        return Err(DepositErr::BalanceLow);
    }

    let transfer_args = ic_ledger_types::TransferArgs {
        memo: Memo(0),
        amount: balance - Tokens::from_e8s(ICP_FEE),
        fee: Tokens::from_e8s(ICP_FEE),
        from_subaccount: Some(principal_to_subaccount(&caller)),
        to: AccountIdentifier::new(&canister_id, &DEFAULT_SUBACCOUNT),
        created_at_time: None,
    };
    ic_ledger_types::transfer(ledger_canister_id, transfer_args)
        .await
        .map_err(|_| DepositErr::TransferFailure)?
        .map_err(|_| DepositErr::TransferFailure)?;

    ic_cdk::println!(
        "Deposit of {} ICP in account {:?}",
        balance - Tokens::from_e8s(ICP_FEE),
        &account
    );

    Ok((balance.e8s() - ICP_FEE).into())
}

async fn deposit_token(caller: Principal, token: Principal) -> Result<Nat, DepositErr> {
    let token = TOKEN::new(token, None);
    let dip_fee = token.get_metadata().await.fee;

    let allowance = token.allowance(caller, ic_cdk::api::id()).await;

    let available = allowance - dip_fee;

    token
        .transfer_from(caller, ic_cdk::api::id(), available.to_owned())
        .await
        .map_err(|_| DepositErr::TransferFailure)?;

    Ok(available)
}

#[ic_cdk::query(name = "getBalance")]
#[candid_method(query, rename = "getBalance")]
pub fn get_balance(token_canister_id: Principal) -> Nat {
    STATE.with(|s| s.borrow().exchange.get_balance(token_canister_id))
}

#[ic_cdk::query(name = "getBalances")]
#[candid_method(query, rename = "getBalances")]
pub fn get_balances() -> Vec<Balance> {
    STATE.with(|s| s.borrow().exchange.get_balances())
}

#[ic_cdk::query(name = "getAllBalances")]
#[candid_method(query, rename = "getAllBalances")]
pub fn get_all_balances() -> Vec<Balance> {
    STATE.with(|s| s.borrow().exchange.get_all_balances())
}

#[ic_cdk::update(name = "getOrder")]
#[candid_method(update, rename = "getOrder")]
pub fn get_order(order: OrderId) -> Option<Order> {
    STATE.with(|s| s.borrow().exchange.get_order(order))
}

#[ic_cdk::update(name = "getOrders")]
#[candid_method(update, rename = "getOrders")]
pub fn get_orders() -> Vec<Order> {
    STATE.with(|s| s.borrow().exchange.get_all_orders())
}

#[ic_cdk::update(name = "getDepositAdress")]
#[candid_method(update, rename = "getDepositAddress")]
pub fn get_deposit_address() -> AccountIdentifier {
    let canister_id = ic_cdk::api::id();
    let subaccount = principal_to_subaccount(&caller());

    AccountIdentifier::new(&canister_id, &subaccount)
}

#[ic_cdk::update(name = "getSymbol")]
#[candid_method(update, rename = "getSymbol")]
pub async fn get_symbol(token_canister_id: Principal) -> String {
    let ledger_canister_id = STATE
        .with(|s| s.borrow().ledger)
        .unwrap_or(MAINNET_LEDGER_CANISTER_ID);

    if token_canister_id == ledger_canister_id {
        "ICP".to_string()
    } else {
        TOKEN::new(token_canister_id, None)
            .get_metadata()
            .await
            .symbol
    }
}

#[ic_cdk::update(name = "placeOrder")]
#[candid_method(update, rename = "placeOrder")]
pub fn place_order(
    from_token_canister_id: Principal,
    from_amount: Nat,
    to_token_canister_id: Principal,
    to_amount: Nat,
) -> OrderPlacementReceipt {
    STATE.with(|s| {
        s.borrow_mut().exchange.place_order(
            from_token_canister_id,
            from_amount,
            to_token_canister_id,
            to_amount,
        )
    })
}

#[ic_cdk::update(name = "cancelOrder")]
#[candid_method(update, rename = "cancelOrder")]
pub fn cancel_order(order: OrderId) -> CancelOrderReceipt {
    STATE.with(|s| s.borrow_mut().exchange.cancel_order(order))
}

#[ic_cdk::update]
#[candid_method(update)]
pub async fn withdraw(
    token_canister_id: Principal,
    amount: Nat,
    address: Principal,
) -> WithdrawReceipt {
    let caller = caller();
    let ledger_canister_id = STATE
        .with(|s| s.borrow().ledger)
        .unwrap_or(MAINNET_LEDGER_CANISTER_ID);

    STATE.with(|s| {
        s.borrow_mut()
            .exchange
            .orders
            .retain(|_, v| v.owner != caller);
    });

    if token_canister_id == ledger_canister_id {
        let account_id = AccountIdentifier::new(&address, &DEFAULT_SUBACCOUNT);
        withdraw_icp(&amount, account_id).await
    } else {
        withdraw_token(token_canister_id, &amount, address).await
    }
}

async fn withdraw_icp(amount: &Nat, account_id: AccountIdentifier) -> Result<Nat, WithdrawErr> {
    let caller = caller();
    let ledger_canister_id = STATE
        .with(|s| s.borrow().ledger)
        .unwrap_or(MAINNET_LEDGER_CANISTER_ID);

    let sufficient_balance = STATE.with(|s| {
        s.borrow_mut().exchange.balances.subtract_balance(
            &caller,
            &ledger_canister_id,
            amount.to_owned() + ICP_FEE,
        )
    });
    if !sufficient_balance {
        return Err(WithdrawErr::BalanceLow);
    }

    let transfer_amount = Tokens::from_e8s(
        (amount.to_owned() + ICP_FEE)
            .0
            .try_into()
            .map_err(|_| WithdrawErr::TransferFailure)?,
    );

    let transfer_args = ic_ledger_types::TransferArgs {
        memo: Memo(0),
        amount: transfer_amount,
        fee: Tokens::from_e8s(ICP_FEE),
        from_subaccount: Some(DEFAULT_SUBACCOUNT),
        to: account_id,
        created_at_time: None,
    };
    let icp_reciept = ic_ledger_types::transfer(ledger_canister_id, transfer_args)
        .await
        .map_err(|_| WithdrawErr::TransferFailure)
        .and_then(|v| v.map_err(|_| WithdrawErr::TransferFailure));

    if let Err(e) = icp_reciept {
        STATE.with(|s| {
            s.borrow_mut().exchange.balances.add_balance(
                &caller,
                &ledger_canister_id,
                amount.to_owned() + ICP_FEE,
            )
        });

        return Err(e);
    }

    ic_cdk::println!("Withdrawal of {} ICP to account {:?}", amount, &account_id);

    Ok(amount.to_owned() + ICP_FEE)
}

async fn withdraw_token(
    token: Principal,
    amount: &Nat,
    address: Principal,
) -> Result<Nat, WithdrawErr> {
    let caller = caller();
    let dip = TOKEN::new(token, None);
    let dip_fee = dip.get_metadata().await.fee;

    let sufficient_balance = STATE.with(|s| {
        s.borrow_mut().exchange.balances.subtract_balance(
            &caller,
            &token,
            amount.to_owned() + dip_fee.to_owned(),
        )
    });
    if !sufficient_balance {
        return Err(WithdrawErr::BalanceLow);
    }

    let tx_receipt = dip
        .transfer(address, amount.to_owned() + dip_fee.to_owned())
        .await
        .map_err(|_| WithdrawErr::TransferFailure);

    if let Err(e) = tx_receipt {
        STATE.with(|s| {
            s.borrow_mut().exchange.balances.add_balance(
                &caller,
                &token,
                amount.to_owned() + dip_fee.to_owned(),
            )
        });

        return Err(e);
    }

    Ok(amount.to_owned() + dip_fee)
}

#[ic_cdk::query]
#[candid_method(query)]
pub fn whoami() -> Principal {
    caller()
}

#[ic_cdk::update]
#[candid_method(oneway)]
pub fn credit(user: Principal, token_canister_id: Principal, amount: Nat) {
    STATE.with(|s| {
        let mut state = s.borrow_mut();
        let owner = state.owner.unwrap();

        ic_cdk::println!("credit {} {}", caller(), owner);
        assert!(owner == caller());
        state
            .exchange
            .balances
            .add_balance(&user, &token_canister_id, amount);
    })
}

#[ic_cdk::update]
#[candid_method(oneway)]
pub fn clear() {
    STATE.with(|s| {
        let mut state = s.borrow_mut();

        assert!(state.owner.unwrap() == caller());
        state.exchange.orders.clear();
        state.exchange.balances.0.clear();
    })
}

#[ic_cdk::init]
fn init(ledger: Option<Principal>) {
    ic_cdk::setup();
    STATE.with(|s| {
        s.borrow_mut().owner = Some(caller());
        s.borrow_mut().ledger = ledger;
    });
}

#[ic_cdk::pre_upgrade]
fn pre_upgrade() {
    let state = STATE.with(|s| s.take());

    let stable_state: stable::StableState = state.into();

    ic_cdk::storage::stable_save((stable_state,)).expect("failed to save stable state");
}

#[ic_cdk::post_upgrade]
fn post_upgrade() {
    let (stable_state,): (stable::StableState,) =
        ic_cdk::storage::stable_restore().expect("failed to restore stable state");

    let state = stable_state.into();

    STATE.with(|s| {
        s.replace(state);
    });
}
