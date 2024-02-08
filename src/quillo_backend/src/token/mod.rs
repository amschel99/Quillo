use candid::{CandidType, Deserialize, Nat, Principal};

#[derive(candid::CandidType, Clone, Serialize, Deserialize)]
pub struct TOKEN {
    principal: Principal,
    name: Option<String>,
}

#[derive(CandidType, Debug, PartialEq, Deserialize)]
pub enum TxError {
    InsufficientBalance,
    InsufficientAllowance,
    Unauthorized,
    LedgerTrap,
    AmountTooSmall,
    BlockUsed,
    ErrorOperationStyle,
    ErrorTo,
    Other,
}
pub type TxReceipt = Result<Nat, TxError>;

#[allow(non_snake_case)]
#[derive(CandidType, Clone, Debug, Deserialize)]
pub struct Metadata {
    pub logo: String,
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub totalSupply: Nat,
    pub owner: Principal,
    pub fee: Nat,
}

impl TOKEN {
    pub fn new(principal: Principal, name: Option<String>) -> Self {
        TOKEN { principal, name }
    }

    pub async fn transfer(&self, target: Principal, amount: Nat) -> TxReceipt {
        let call_result: Result<(TxReceipt,), _> =
            ic_cdk::api::call::call(self.principal, "transfer", (target, amount)).await;

        call_result.unwrap().0
    }

    pub async fn transfer_from(
        &self,
        source: Principal,
        target: Principal,
        amount: Nat,
    ) -> TxReceipt {
        let call_result: Result<(TxReceipt,), _> =
            ic_cdk::api::call::call(self.principal, "transferFrom", (source, target, amount)).await;

        call_result.unwrap().0
    }

    pub async fn allowance(&self, owner: Principal, spender: Principal) -> Nat {
        let call_result: Result<(Nat,), _> =
            ic_cdk::api::call::call(self.principal, "allowance", (owner, spender)).await;

        call_result.unwrap().0
    }

    pub async fn get_metadata(&self) -> Metadata {
        let call_result: Result<(Metadata,), _> =
            ic_cdk::api::call::call(self.principal, "getMetadata", ()).await;

        call_result.unwrap().0
    }
}
