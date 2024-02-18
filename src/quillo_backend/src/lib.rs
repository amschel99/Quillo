#![allow(dead_code, unused_variables, unused_imports)]
#[macro_use]
extern crate serde;
use candid::{candid_method, Decode, Encode, Nat, Principal};
use dao::service::InitPayload;
use ic_cdk::api::time;
use ic_ledger_types::{AccountIdentifier, MAINNET_LEDGER_CANISTER_ID};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{
    BTreeMap, BoundedStorable, Cell, DefaultMemoryImpl, StableBTreeMap, Storable,
};
use investor::types::Investor;
use num_traits::ToPrimitive;
use std::ops::Deref;
use std::{borrow::Cow, cell::RefCell};
mod company;
mod dao;
mod dex;
mod global_types;
mod investor;
mod token;
use company::*;
use dao::types::{Dao, SystemParams};
use dex::service::*;
use dex::types::*;
use global_types::*;
use token::TOKEN;

type Memory = VirtualMemory<DefaultMemoryImpl>;
type IdCell = Cell<u64, Memory>;

thread_local! {
static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(
        MemoryManager::init(DefaultMemoryImpl::default())
    );

static ID_COUNTER: RefCell<IdCell> = RefCell::new(
        IdCell::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))), 0)
            .expect("Cannot create a counter")
    );

static COMPANYSTORAGE: RefCell<StableBTreeMap<u64, CompanyInformation, Memory>> =
        RefCell::new(StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
    ));

    static DAOSTORAGE: RefCell<StableBTreeMap<u64, Dao, Memory>> =
        RefCell::new(StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
    ));
    static INVESTORSTORAGE: RefCell<StableBTreeMap<u64, Investor, Memory>> =
    RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
));





 }

#[ic_cdk::update]

fn signup_company(payload: CompanyInformation) {
    let id = ID_COUNTER.with(|counter| {
        let counter_value = *counter.borrow().get();
        let _ = counter.borrow_mut().set(counter_value + 1);
        counter_value
    });
    let mut company = CompanyInformation {
        company_name: payload.company_name,
        company_description: payload.company_description,
        industry: payload.industry,

        date_founded: payload.date_founded,
        location: payload.location,
        legal_info: payload.legal_info,
        id,
        tokenization_info: payload.tokenization_info,
        principal: ic_cdk::caller(),
        dao_id: None,
    };
    let governance_params = SystemParams {
        proposal_submission_deposit: 10.into(),
        proposal_vote_threshold: 10.into(),
        transfer_fee: 10.into(),
    };
    company.dao_id = Some(_assign_dao(&company, governance_params));
}

fn _signup_company(company: &CompanyInformation) {
    COMPANYSTORAGE.with(|service| service.borrow_mut().insert(company.id, company.clone()));
}

fn _assign_dao(company: &CompanyInformation, governance_params: SystemParams) -> u64 {
    let id = ID_COUNTER.with(|counter| {
        let counter_value = *counter.borrow().get();
        let _ = counter.borrow_mut().set(counter_value + 1);
        counter_value
    });

    let dao_payload = InitPayload {
        id,
        system_params: governance_params,
        total_shares: company.tokenization_info.class.value().into(),
    };
    let mut created_dao = Dao::new(dao_payload);
    created_dao.token = Some(TOKEN::new(
        ic_cdk::caller(),
        Some(company.clone().company_name),
    ));

    save_dao(created_dao);

    id
}

#[ic_cdk::update]
fn save_dao(dao: Dao) {
    DAOSTORAGE.with(|service| service.borrow_mut().insert(dao.id, dao.clone()));
}

#[ic_cdk::update]

fn signup_investor(investor: Investor) {
    let id = ID_COUNTER.with(|counter| {
        let counter_value = *counter.borrow().get();
        let _ = counter.borrow_mut().set(counter_value + 1);
        counter_value
    });
    let investor = Investor {
        id,
        investments: None,
        principal: ic_cdk::caller(),
    };
    _signup_investor(investor);
}

fn _signup_investor(investor: Investor) {
    INVESTORSTORAGE.with(|service| service.borrow_mut().insert(investor.id, investor.clone()));
}
#[ic_cdk::update]

fn buy_tokens(amount: Nat, company_id: u64) -> Result<String, Error> {
    let id = ID_COUNTER.with(|counter| {
        let counter_value = *counter.borrow().get();
        let _ = counter.borrow_mut().set(counter_value + 1);
        counter_value
    });

    let total_to_pay: f64;

    let company = COMPANYSTORAGE.with(|company_storage| company_storage.borrow().get(&company_id));
    match company {
        Some(company) => {
            let token_info = _calculate_outstanding_tokens(company);
            if token_info.0 < amount {
                return Err(Error::NotFound {
                    msg: format!("The company does not have enough outstanding tokens!"),
                });
            }
            total_to_pay = token_info.0 as f64 * token_info.1;
        }
        None => {
            return Err(Error::NotFound {
                msg: format!("No enough balance to buy tokens!"),
            });
        }
    }

    let ledger_canister_id = STATE
        .with(|s| s.borrow().ledger)
        .unwrap_or(MAINNET_LEDGER_CANISTER_ID);
    let wallet_balance = get_balance(ledger_canister_id).0.to_f64().unwrap();
    if total_to_pay < wallet_balance {
        return Err(Error::NotFound {
            msg: format!("No enough balance to buy tokens!"),
        });
    }

    credit(
        COMPANYSTORAGE
            .with(|company_storage| company_storage.borrow().get(&company_id))
            .unwrap()
            .principal,
        ledger_canister_id,
        (total_to_pay as u128).into(),
    );
    Ok("Succefully bought tokens".to_string())
}

fn _calculate_outstanding_tokens(company: CompanyInformation) -> (u128, f64) {
    let valuation = company.tokenization_info.valuation;
    let percent_to_tokenize: f64 = company.tokenization_info.percent_to_tokenize.into();
    let outstanding_value = (valuation * percent_to_tokenize) / 100.00;
    let company_class = company.tokenization_info.class.value();
    let per_token_per_price = outstanding_value / company_class as f64;

    (company_class, per_token_per_price)
}

#[derive(candid::CandidType, Deserialize, Serialize, Debug)]
enum Error {
    NotFound { msg: String },
}

ic_cdk::export_candid!();
