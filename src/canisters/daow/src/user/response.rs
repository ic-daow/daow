
use candid::{CandidType, Deserialize};

#[derive(Debug, CandidType, Deserialize)]
pub enum RegisterResponse {
    #[serde(rename = "registered")]
    Registered { id: String },
    #[serde(rename = "user_already_exists")]
    UserAlreadyExists { id: String },
    #[serde(rename = "user_already_disabled")]
    UserAlreadyDisabled { id: String },
    #[serde(rename = "internal_error")]
    InternalError,
}