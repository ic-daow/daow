
use candid::{CandidType, Deserialize, Principal};

#[derive(Debug, CandidType, Deserialize)]
pub enum RegisterResult {
    #[serde(rename = "registered")]
    Registered { owner: Principal },
    #[serde(rename = "user_already_exists")]
    UserAlreadyExists,
    #[serde(rename = "user_already_disabled")]
    UserAlreadyDisabled { owner: Principal },
    #[serde(rename = "internal_error")]
    InternalError,
}