#![allow(dead_code, unused_variables, unused_imports)]
#[macro_use]
extern crate serde;

use candid::{Decode, Encode, Nat, Principal};
use dao::service::InitPayload;

use ic_cdk::api::time;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{
    BTreeMap, BoundedStorable, Cell, DefaultMemoryImpl, StableBTreeMap, Storable,
};
use investor::types::Investor;

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
//Helper function to insert a company
fn _signup_company(company: &CompanyInformation) {
    COMPANYSTORAGE.with(|service| service.borrow_mut().insert(company.id, company.clone()));
}

fn _assign_dao(company: &CompanyInformation, governance_params: SystemParams) -> u64 {
    //TODO Create a dao for the given company

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

fn buy_tokens(amount: Nat) {
    //TODO
    /*
    1. add the investor to the dao

    2. Update the investments field of the investor

    3. Deduct money from their wallet

    4. Add money to the company's wallet



     */
}
