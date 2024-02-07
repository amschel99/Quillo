#![allow(dead_code, unused_variables, unused_imports)]
#[macro_use]
extern crate serde;
use candid::{Decode, Encode};
use company::CompanyInformation;
use ic_cdk::api::time;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{BoundedStorable, Cell, DefaultMemoryImpl, StableBTreeMap, Storable};

use std::{borrow::Cow, cell::RefCell};

type Memory = VirtualMemory<DefaultMemoryImpl>;
type IdCell = Cell<u64, Memory>;

mod company;
mod global_types;
mod investor;
