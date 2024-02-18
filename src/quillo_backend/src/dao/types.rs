use super::super::token::TOKEN;
use crate::global_types::*;
use candid::{CandidType, Decode, Encode, Principal};
use ic_stable_structures::{BoundedStorable, Storable};
use icrc_ledger_types::icrc1::{account::Account, transfer::NumTokens};
use std::borrow::Cow;

#[derive(candid::CandidType, Clone, Serialize, Deserialize)]
pub struct Dao {
    pub accounts: Option<Vec<Account>>,
    pub total_shares: NumTokens,
    pub id: u64,
    pub system_params: SystemParams,
    pub proposals: Option<Vec<Proposal>>,
    pub token: Option<TOKEN>,
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

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct Proposal {
    pub id: u64,
    pub timestamp: u64,
    pub proposer: Principal,
    pub payload: ProposalPayload,
    pub state: ProposalState,
    pub votes_yes: NumTokens,
    pub votes_no: NumTokens,
    pub voters: Vec<Principal>,
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct ProposalPayload {
    pub canister_id: Principal,
    pub method: String,
    pub message: Vec<u8>,
}

#[derive(Clone, Debug, CandidType, Deserialize, PartialEq, Serialize)]
pub enum ProposalState {
    Open,
    Accepted,
    Rejected,
    Executing,
    Succeeded,
    Failed(String),
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub enum Vote {
    Yes,
    No,
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct TransferArgs {
    pub to: Principal,
    pub amount: NumTokens,
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct VoteArgs {
    pub proposal_id: u64,
    pub vote: Vote,
}

#[derive(Clone, Default, Debug, CandidType, Deserialize, Serialize)]
pub struct SystemParams {
    pub transfer_fee: NumTokens,

    pub proposal_vote_threshold: NumTokens,

    pub proposal_submission_deposit: NumTokens,
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct UpdateSystemParamsPayload {
    pub transfer_fee: Option<NumTokens>,
    pub proposal_vote_threshold: Option<NumTokens>,
    pub proposal_submission_deposit: Option<NumTokens>,
}
