
use candid::{CandidType, Deserialize};
use ic_cdk::export::Principal;

pub type UserId = u64;

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct UserProfile {
    id: UserId,
    principal: String,     // 用户 Principal
    email: String,
    name: String,
    memo: Option<String>,
    status: UserStatus,
    created_at: u64,
}

impl UserProfile {
    pub fn new(id: UserId, principal: String, email: String, name: String, memo: Option<String>, status: UserStatus, created_at: u64) -> Self {
        Self {
            id,
            principal,
            email,
            name,
            memo,
            status,
            created_at,
        }
    }
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub enum UserStatus {
    Enable,
    Disable,
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct UserRegisterCommand {
    pub email: String,
    pub name: String,
    pub memo: Option<String>,
}

impl UserRegisterCommand {
    pub fn to_profile(self, id: UserId, principal: String, status: UserStatus, created_at: u64) -> UserProfile {
        UserProfile::new(id, principal, self.email, self.name, self.memo, status, created_at)
    }
}

