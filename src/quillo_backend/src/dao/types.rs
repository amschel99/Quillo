use std::borrow::Cow;

use crate::global_types::*;
use candid::{CandidType, Decode, Encode, Principal};
use ic_stable_structures::{BoundedStorable, Storable};
use icrc_ledger_types::icrc1::account::Account;

#[derive(candid::CandidType, Clone, Serialize, Deserialize)]

pub struct Dao {
    pub accounts: Vec<Account>,

    pub total_shares: NumTokens,
    pub id: Principal,
}

impl Storable for Dao {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

impl BoundedStorable for Dao {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}
