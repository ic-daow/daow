
use candid::{CandidType, Deserialize};

#[derive(Debug, Clone, CandidType, Deserialize)]
pub enum ClaimError { 
    ProposalNotFound,
    ProposalAlreadyExists,
    ProposalStateNotOpen,
    ProjectInvalid,
    VoterAlreadyVoted,
    ClaimAmountExceedUpperLimit,
}