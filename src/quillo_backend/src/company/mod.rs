#![allow(dead_code, unused_imports)]

use candid::{Decode, Encode, Principal};
use ic_cdk::api::time;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{BoundedStorable, Cell, DefaultMemoryImpl, StableBTreeMap, Storable};
use std::{borrow::Cow, cell::RefCell};

use crate::global_types::*;

#[derive(candid::CandidType, Clone, Serialize, Deserialize)]
pub struct CompanyInformation {
    pub id: Principal,
    pub company_name: String,
    pub company_description: String,
    pub industry: Industry,
    pub location: Location,
    pub date_founded: String,
}
