
use candid::{CandidType, Deserialize};

#[derive(Debug, Clone, CandidType, Deserialize)]
pub enum ProjectCreatedResult {
    Ok(u64),
    Err(ProjectCreatedError),
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub enum ProjectCreatedError {
    UserNotFound,
    ProjectAlreadyExists,
}