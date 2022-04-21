
use candid::{CandidType, Deserialize, Principal};

pub type UserId = u64;
pub type Timestamp = u64;

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct UserProfile {
    pub id: UserId,
    pub owner: Principal,     // 用户 Principal
    pub email: String,
    pub name: String,
    pub memo: Option<String>,
    pub status: UserStatus,
    pub created_at: Timestamp,
}

impl UserProfile {
    pub fn new(id: UserId, owner: Principal, email: String, name: String, memo: Option<String>, status: UserStatus, created_at: u64) -> Self {
        Self {
            id,
            owner,
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
    pub fn build_profile(self, id: UserId, owner: Principal, status: UserStatus, created_at: u64) -> UserProfile {
        UserProfile::new(id, owner, self.email, self.name, self.memo, status, created_at)
    }
}

