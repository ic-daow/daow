
use std::ops::{Add, AddAssign, SubAssign, Mul};

use candid::{CandidType, Deserialize, Principal};

pub type ClaimId = u64;

pub type Timestamp = u64;

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ClaimProposal {
    pub id: u64,
    pub proposer: Principal,
    pub payload: ProposalPayload,
    pub state: ProposalState,
    pub votes_yes: Weights,
    pub votes_no: Weights,
    pub voters: Vec<Principal>,
    pub vote_threshold: Weights,
    pub created_at: u64,
}

impl ClaimProposal {

    pub fn calc(&mut self, vote: Vote, weights: Weights) {
        match vote {
            Vote::Yes => self.votes_yes += weights,
            Vote::No => self.votes_no += weights,
        }
    }

    pub fn refresh_state(&mut self) {
        if self.votes_yes > self.vote_threshold {
            self.state = ProposalState::Accepted;
        } else if self.votes_no > self.vote_threshold {
            self.state = ProposalState::Rejected;
        }
    }
}

/// The data needed to call a given method on a given canister with given args
#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct ProposalPayload {
    pub project_id: u64,
    pub amount_e8s: u64,
    pub recipient_principal: String,
    // pub canister_id: Principal,
    // pub method: String,
    // pub message: Vec<u8>,
}

impl ProposalPayload {
    pub fn build_proposal(self, id: u64, proposer: Principal, vote_threshold: Weights, created_at: Timestamp) -> ClaimProposal {
        ClaimProposal { 
            id, 
            proposer,
            payload: self,
            state: ProposalState::Open,
            votes_yes: Weights::default(),
            votes_no: Weights::default(),
            voters: vec![],
            vote_threshold,
            created_at
        }
    }
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct TransferCommand {
    pub amount_e8s: u64,
    pub recipient_principal: String,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct VoteArgs {
    pub proposal_id: u64,
    pub vote: Vote,
}

pub struct ClaimVoteCommand {
    pub proposal_id: u64,
    pub vote: Vote,
    pub voter: Principal,
    pub vote_weights: Weights,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub enum Vote {
    Yes,
    No,
}
// The state of a Proposal
#[derive(Clone, Debug, CandidType, Deserialize, PartialEq)]
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

#[derive(Clone, Copy, Debug, Default, CandidType, Deserialize, PartialEq, PartialOrd)]
pub struct Weights {
    pub amount_e8s: u64,
}

impl Add for Weights {
    type Output = Self;

    fn add(self, other: Self) -> Self {
        Weights { amount_e8s: self.amount_e8s + other.amount_e8s }
    }
}

impl AddAssign for Weights {
    fn add_assign(&mut self, other: Self) {
        self.amount_e8s += other.amount_e8s;
    }
}

impl SubAssign for Weights {
    fn sub_assign(&mut self, other: Self) {
        self.amount_e8s -= other.amount_e8s;
    }
}

impl Mul<u64> for Weights {
    type Output = Weights;
    fn mul(self, rhs: u64) -> Self {
        Weights { amount_e8s: self.amount_e8s * rhs }
    }
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ClaimProposalGetQuery {
    pub id: ClaimId,
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ClaimProposalPageQuery {
    pub page_size: usize,
    pub page_num: usize,
    pub querystring: String,
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ClaimProposalPage {
    pub data: Vec<ClaimProposal>,
    pub page_size: usize,
    pub page_num: usize,
    pub total_count: usize,
}

