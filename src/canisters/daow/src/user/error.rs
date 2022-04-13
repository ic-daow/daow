
use candid::{CandidType, Deserialize};
use thiserror::Error;

#[derive(Debug, CandidType, Deserialize, Error)]
pub enum UserError {
    #[error("User {0} not found")]
    UserNotFound(String),
    #[error("User {0} already exists")]
    UserAlreadyExists(String),
    #[error("User {0} is not enabled")]
    UserAlreadyDisabled(String),
}