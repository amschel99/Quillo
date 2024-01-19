#![allow(dead_code, unused_imports)]

use candid::{Decode, Encode};
use ic_cdk::api::time;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{BoundedStorable, Cell, DefaultMemoryImpl, StableBTreeMap, Storable};
use std::{borrow::Cow, cell::RefCell};

#[derive(candid::CandidType, Clone, Serialize, Deserialize, Default)]
pub struct EarningsData {
    net_income: f64,
    ebitda: f64,
    consistency: bool,
    adjustments: f64,
}
#[derive(candid::CandidType, Clone, Serialize, Deserialize, Default)]
pub struct MultiplierData {
    industry_comparables: f64,
    growth_prospects: f64,
    risk_factors: f64,
    market_conditions: f64,
    comparable_transactions: f64,
}
#[derive(candid::CandidType, Clone, Serialize, Deserialize, Default)]
pub struct CompanyInformation {
    pub id: u64,
    pub name: String,
    pub registration_number: String,
    pub legal_address: String,
    pub industry_sector: String,
    pub logo: Vec<u8>,
    pub earnings: EarningsData,
    pub multiplier: MultiplierData,
    pub valuation: f64,
    pub token_value: f64,

    pub initial_tokens: Option<f64>,
    pub token_balance: Option<f64>,
}
pub trait Onboardable {
    fn onboard_company(
        name: &str,
        registration_number: &str,
        legal_address: &str,
        industry_sector: &str,
        logo: Vec<u8>,
        earnings: EarningsData,
        multiplier: MultiplierData,
    ) -> Self;
}
impl CompanyInformation {
    pub fn valuate(&self) -> f64 {
        let int_income: f64;
        let int_multiplier: f64;

        if self.earnings.consistency {
            int_income = self.earnings.net_income;
        } else {
            int_income = self.earnings.net_income + self.earnings.adjustments;
        }
        int_multiplier = self.multiplier.industry_comparables
            * self.multiplier.growth_prospects
            * self.multiplier.market_conditions
            * self.multiplier.risk_factors
            * self.multiplier.comparable_transactions;

        int_income * int_multiplier
    }
}

pub trait Tokenizable {
    fn tokenize(&self) -> f64;
}

impl Tokenizable for CompanyInformation {
    fn tokenize(&self) -> f64 {
        let shares_constant: f64 = 10000.0;
        let company_valution: f64 = self.valuation;
        let value_per_share: f64 = company_valution / shares_constant;

        value_per_share
    }
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
