use crate::{dao::types::Dao, global_types::*};
use candid::{Decode, Encode, Principal};
use ic_stable_structures::{
    BTreeMap, BoundedStorable, Cell, DefaultMemoryImpl, StableBTreeMap, Storable,
};
use std::{borrow::Cow, cell::RefCell};
#[derive(candid::CandidType, Clone, Serialize, Deserialize)]

pub struct CompanyInformation {
    pub id: u64,
    pub company_name: String,
    pub company_description: String,
    pub industry: Industry,
    pub location: Location,
    pub date_founded: String,
    pub principal: Principal,
    pub tokenization_info: CompanyTokenizationInfo,
    pub legal_info: CompanyLegalDocuments,
    pub dao_id: Option<u64>,
}
#[derive(candid::CandidType, Clone, Serialize, Deserialize)]
pub struct CompanyTokenizationInfo {
    pub valuation: f64,
    pub percent_to_tokenize: u8,

    pub class: Class,
    pub price_per_token: f64,
}

/* A file is stored as a buffer of string */

#[derive(candid::CandidType, Clone, Serialize, Deserialize)]

pub struct CompanyLegalDocuments {
    registration_certificate: String,
    tax_information: String,
    incorporation_cert: String,
}

impl Storable for CompanyInformation {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }
}

impl BoundedStorable for CompanyInformation {
    const MAX_SIZE: u32 = 1024;
    const IS_FIXED_SIZE: bool = false;
}
