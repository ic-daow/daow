
use candid::{CandidType, Deserialize};

#[derive(Debug, Clone, CandidType, Deserialize)]
pub enum TransactionError { 
    TransactionNotFound,
    TransactionNotFinalized,
    TransactionBlockHeightNotValid,
    TransactionAlreadyExists,
    ProjectInvalid,
}