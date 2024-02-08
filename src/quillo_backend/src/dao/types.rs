use std::borrow::Cow;

use super::super::token::TOKEN;
use crate::global_types::*;
use candid::{CandidType, Decode, Encode, Principal};
use ic_stable_structures::{BoundedStorable, Storable};
use icrc_ledger_types::icrc1::{account::Account, transfer::NumTokens};
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
// The state of a Proposal
#[derive(Clone, Debug, CandidType, Deserialize, PartialEq, Serialize)]
pub enum ProposalState {
    // The proposal is open for voting
    Open,

    // Enough "yes" votes have been cast to accept the proposal, and it will soon be executed
    Accepted,

    // Enough "no" votes have been cast to reject the proposal, and it will not be executed
    Rejected,

    // The proposal is currently being executed
    Executing,

    // The proposal has been successfully executed
    Succeeded,

    // A failure occurred while executing the proposal
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
    // The fee incurred by transferring tokens
    pub transfer_fee: NumTokens,

    // The amount of tokens needed to vote "yes" to accept, or "no" to reject, a proposal
    pub proposal_vote_threshold: NumTokens,

    // The amount of tokens that will be temporarily deducted from the account of
    // a user that submits a proposal. If the proposal is Accepted, this deposit is returned,
    // otherwise it is lost. This prevents users from submitting superfluous proposals.
    pub proposal_submission_deposit: NumTokens,
}
#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct UpdateSystemParamsPayload {
    pub transfer_fee: Option<NumTokens>,
    pub proposal_vote_threshold: Option<NumTokens>,
    pub proposal_submission_deposit: Option<NumTokens>,
}
