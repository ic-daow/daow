
use candid::{CandidType, Deserialize};
use thiserror::Error;

#[derive(Debug, CandidType, Deserialize, Error)]
pub enum UserError {
    #[error("User not found")]
    UserNotFound,
    #[error("User already exists")]
    UserAlreadyExists,
    #[error("User  is not enabled")]
    UserAlreadyDisable,
}