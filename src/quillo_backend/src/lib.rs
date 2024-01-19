#![allow(dead_code, unused_variables, unused_imports)]
#[macro_use]
extern crate serde;
use candid::{Decode, Encode};
use company::Tokenizable;
use ic_cdk::api::time;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{BoundedStorable, Cell, DefaultMemoryImpl, StableBTreeMap, Storable};
use std::{borrow::Cow, cell::RefCell};

type Memory = VirtualMemory<DefaultMemoryImpl>;
type IdCell = Cell<u64, Memory>;

mod company;
mod investor;

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(
        MemoryManager::init(DefaultMemoryImpl::default())
    );

    static ID_COUNTER: RefCell<IdCell> = RefCell::new(
        IdCell::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))), 0)
            .expect("Cannot create a counter")
    );

    static STORAGE: RefCell<StableBTreeMap<u64, company::CompanyInformation, Memory>> =
        RefCell::new(StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
    ));


    static INVESTORSTORAGE: RefCell<StableBTreeMap<u64, investor::Investor, Memory>> =
        RefCell::new(StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
    ));
}

#[ic_cdk::update]
fn add_company(company: company::CompanyInformation) -> Option<company::CompanyInformation> {
    let id = ID_COUNTER
        .with(|counter| {
            let current_value = *counter.borrow().get();
            counter.borrow_mut().set(current_value + 1)
        })
        .expect("cannot increment id counter");
    let mut company = company::CompanyInformation {
        id: company.id,
        name: company.name,
        registration_number: company.registration_number,
        legal_address: company.legal_address,
        industry_sector: company.industry_sector,
        logo: company.logo,
        earnings: company.earnings,
        multiplier: company.multiplier,
        valuation: 0.00,
        token_value: 0.00,
        token_balance: Some(10000.0),
        initial_tokens: Some(10000.0),
    };
    let company_valuation = company.valuate();
    let company_token_value = company.tokenize();
    company.valuation = company_valuation;
    company.token_value = company_token_value;

    do_insert_company(&company);
    Some(company)
}

fn do_insert_company(company: &company::CompanyInformation) {
    STORAGE.with(|service| service.borrow_mut().insert(company.id, company.clone()));
}

#[ic_cdk::update]
fn add_investor(investor: investor::Investor) -> Option<investor::Investor> {
    let id = ID_COUNTER
        .with(|counter| {
            let current_value = *counter.borrow().get();
            counter.borrow_mut().set(current_value + 1)
        })
        .expect("cannot increment id counter");
    let investor = investor::Investor {
        id: investor.id,
        shares: investor.shares,
    };
    do_insert_investor(&investor);
    Some(investor)
}

fn do_insert_investor(investor: &investor::Investor) {
    INVESTORSTORAGE.with(|service| service.borrow_mut().insert(investor.id, investor.clone()));
}

#[ic_cdk::query]
fn get_company(id: u64) -> Result<company::CompanyInformation, Error> {
    match _get_company(&id) {
        Some(message) => Ok(message),
        None => Err(Error::NotFound {
            msg: format!("Company with id={} not found", id),
        }),
    }
}

fn _get_company(id: &u64) -> Option<company::CompanyInformation> {
    STORAGE.with(|s| s.borrow().get(id))
}

#[derive(candid::CandidType, Deserialize, Serialize)]
enum Error {
    NotFound { msg: String },
}
