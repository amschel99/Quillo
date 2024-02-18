use candid::{Decode, Encode, Principal};
use ic_stable_structures::{BoundedStorable, Storable};
use icrc_ledger_types::icrc1::transfer::NumTokens;
use std::borrow::Cow;

#[derive(candid::CandidType, Clone, Serialize, Deserialize)]
pub struct Investor {
    pub principal: Principal,
    pub id: u64,
    pub investments: Option<Vec<Investment>>,
}

#[derive(candid::CandidType, Clone, Serialize, Deserialize)]
pub struct Investment {
    dao_id: u64,
    tokens_owned: NumTokens,
}

impl Storable for Investor {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

impl BoundedStorable for Investor {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}
