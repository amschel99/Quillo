#![allow(dead_code, unused_variables, unused_imports)]
#[macro_use]
extern crate serde;
use candid::{Decode, Encode, Principal};
//use company::CompanyInformation;
use ic_cdk::api::time;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{
    BTreeMap, BoundedStorable, Cell, DefaultMemoryImpl, StableBTreeMap, Storable,
};

use std::ops::Deref;
use std::{borrow::Cow, cell::RefCell};
mod company;
mod global_types;

use company::*;
use global_types::*;

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



 }
#[ic_cdk::update]

fn signup_company(payload: CompanyInformation) {
    let id = ID_COUNTER.with(|counter| {
        let counter_value = *counter.borrow().get();
        let _ = counter.borrow_mut().set(counter_value + 1);
        counter_value
    });
    let company = CompanyInformation {
        company_name: payload.company_name,
        company_description: payload.company_description,
        industry: payload.industry,

        date_founded: payload.date_founded,
        location: payload.location,
        legal_info: payload.legal_info,
        id,
        tokenization_info: payload.tokenization_info,
        principal: ic_cdk::caller(),
    };
}
//Helper function to insert a company
fn _signup_company(company: &CompanyInformation) {
    COMPANYSTORAGE.with(|service| service.borrow_mut().insert(company.id, company.clone()));
    // Now `companies` should have the correct lifetime
}
