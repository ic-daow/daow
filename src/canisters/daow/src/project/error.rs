
use candid::{CandidType, Deserialize};

#[derive(Debug, Clone, CandidType, Deserialize)]
pub enum ProjectError { 
    ProjectNotFound,
    ProjectAlreadyExists,
    UserNotFound,
}