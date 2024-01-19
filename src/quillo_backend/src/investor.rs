use std::borrow::Cow;

use candid::{Decode, Encode};
use ic_stable_structures::{BoundedStorable, Storable};

use crate::company::CompanyInformation;
#[derive(candid::CandidType, Clone, Serialize, Deserialize, Default)]
pub struct Share {
    quantity: u64,
    company: CompanyInformation,
}
#[derive(candid::CandidType, Clone, Serialize, Deserialize, Default)]
pub struct Wallet {
    pub id: u64,
    pub amount: f64,
}
#[derive(candid::CandidType, Clone, Serialize, Deserialize, Default)]
pub struct Investor {
    pub id: u64,
    pub shares: Option<Vec<Share>>,
}

pub trait CanPurchase {
    fn purchase_tokens(&self, company: u64, tokens: f64);
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
