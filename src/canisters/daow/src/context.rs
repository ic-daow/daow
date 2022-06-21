
use candid::{CandidType, Deserialize, Principal};
use std::collections::BTreeMap;
use std::iter::FromIterator;

use crate::claim::ClaimService;
use crate::claim::domain::ClaimProposal;
use crate::env::{Environment, CanisterEnvironment, EmptyEnvironment};
use crate::project::ProjectService;
use crate::project::domain::ProjectProfile;
use crate::transaction::TransactionService;
use crate::transaction::domain::TransactionProfile;
use crate::user::UserService;
use crate::user::domain::UserProfile;

/// DFT Standard WASM 
pub const DFT_STANDARD_WASM : &[u8] = std::include_bytes!("../../dft_all_features/dft_all_features.wasm");

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct DaoDataStorage {
    pub id: u64,
    pub users: Vec<UserProfile>,
    pub projects: Vec<ProjectProfile>,
    pub transactions: Vec<TransactionProfile>,
    pub claims: Vec<ClaimProposal>,
}

impl From<DaoContext> for DaoDataStorage {
    fn from(state: DaoContext) -> Self {
        let id = state.id;
        let users = Vec::from_iter(state.user_service.users
            .iter()
            .map(|(_k, v)| (v.clone())));
        let projects = Vec::from_iter(state.project_service.projects
            .iter()
            .map(|(_k, v)| (v.clone())));
        let transactions = Vec::from_iter(state.transaction_service.transactions
            .iter()
            .map(|(_k, v)| (v.clone())));
        let claims = Vec::from_iter(state.claim_service.proposals
            .iter()
            .map(|(_k, v)| (v.clone())));
        Self {
            id,
            users,
            projects,
            transactions,
            claims
        }
    }
}

pub struct DaoContext {
    pub env: Box<dyn Environment>,
    pub id: u64,
    pub user_service: UserService,
    pub project_service: ProjectService,
    pub transaction_service: TransactionService,
    pub claim_service: ClaimService,
}

impl Default for DaoContext {
    fn default() -> Self {
        Self {
            env: Box::new(EmptyEnvironment {}),
            id: 10001,
            user_service: UserService::default(),
            project_service: ProjectService::default(),
            transaction_service: TransactionService::default(),
            claim_service: ClaimService::default(),
        }
    }
}

impl From<DaoDataStorage> for DaoContext {
    fn from(payload: DaoDataStorage) -> Self {
        let users: BTreeMap<Principal, UserProfile> = payload
            .users
            .into_iter()
            .map(|u| (u.owner, u))
            .collect();
        let projects: BTreeMap<u64, ProjectProfile> = payload
            .projects
            .into_iter()
            .map(|p| (p.id, p))
            .collect();
        let transactions: BTreeMap<u64, TransactionProfile> = payload
            .transactions
            .into_iter()
            .map(|p| (p.id, p))
            .collect();
        let claims: BTreeMap<u64, ClaimProposal> = payload
            .claims
            .into_iter()
            .map(|p| (p.id, p))
            .collect();

        Self {
            env: Box::new(CanisterEnvironment {}),
            id: payload.id,
            user_service: UserService { users },
            project_service: ProjectService { projects },
            transaction_service: TransactionService { transactions },
            claim_service: ClaimService { proposals: claims },
        }
    }
}


