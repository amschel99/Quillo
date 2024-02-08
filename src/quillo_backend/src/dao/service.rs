use icrc_ledger_types::icrc1::{account::Account, transfer::NumTokens};

use crate::Class;

use super::types::{Dao, SystemParams};

impl Dao {
    pub fn new(payload: InitPayload) -> Self {
        Self {
            accounts: None,
            proposals: None,
            id: payload.id,
            system_params: payload.system_params,
            total_shares: payload.total_shares,
            token: None,
        }
    }
}
#[derive(candid::CandidType, Clone, Serialize, Deserialize)]

pub struct InitPayload {
    pub id: u64,
    pub system_params: SystemParams,
    pub total_shares: NumTokens,
}
