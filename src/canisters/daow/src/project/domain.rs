
use std::{str::FromStr, string::ParseError};

use candid::{CandidType, Deserialize, Principal};

pub type ProjectId = u64;

pub type Timestamp = u64;

pub type Blob = Vec<u8>;

// DAO progress statge
#[derive(Debug, Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum ProgressStage {
    Unopen,     // 未开始
    InProgress, // 进行中
    ToClaim,    // 准备 Claim, 还没 Claim 过一次
    Claimed,    // Claim 最少成功过一次
    Completed,  // 已完成， Claim 全部提取完毕
}

// DAO project status
#[derive(Debug, Clone, CandidType, Deserialize, PartialEq, Eq)]
pub enum ProjectStatus {
    Pending,    // 待审核
    Enable,     // 已启用
    Disable,    // 已禁用
}

impl Default for ProjectStatus {
    fn default() -> Self {
        Self::Pending
    }
}

impl FromStr for ProjectStatus {
    type Err = ParseError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_lowercase().as_str() {
            "pending" => Ok(Self::Pending),
            "enable" => Ok(Self::Enable),
            _ => Ok(Self::Disable)
        }
    }
}

// DAO project data structure
#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ProjectProfile {
    pub id: ProjectId,
    pub name: String,
    pub logo: Blob,
    pub logo_id: u64,
    pub description: String,
    pub roadmap: Blob,
    pub roadmap_id: u64,
    pub tokenomics: Tokenomics,
    pub team: Team,
    pub trust_by: TrustBy,
    pub capital_detail: CapitalDetail,
    pub owner: Principal,
    pub owner_info: String,
    pub wallet_addr: String,
    pub contact_info: Vec<String>,
    pub links: Vec<String>,
    pub tags: Vec<String>,
    pub memo: String,
    pub progress: ProgressStage,
    pub actual_raised: u64, // 实际募到的款项
    pub claimed: u64,       // 已经取出的款项
    pub status: ProjectStatus,
    pub created_at: Timestamp,
    pub updated_at: Timestamp,
}

impl ProjectProfile {
    /// 项目名称只能是英文和数字
    pub fn valid_name(name: &str) -> bool {
        let len = name.chars().count();
        (len >= 3 && len <= 50) && name.chars().all(char::is_alphabetic)
    }

    pub fn change_status(&mut self, new_status: ProjectStatus) {
        self.status = new_status;
    }

    pub fn change_progress(&mut self, new_stage: ProgressStage) {
        self.progress = new_stage;
    }
    
    pub fn valid_status(&self) -> bool {
        self.status == ProjectStatus::Enable
    }  

    pub fn valid_progress(&self) -> bool {
        self.progress == ProgressStage::InProgress
    }

    pub fn can_claiming(&self, owner: Principal) -> bool {
        self.valid_status() && 
            (self.progress == ProgressStage::ToClaim || self.progress == ProgressStage::Claimed) &&
            self.is_owner(owner)

    }

    pub fn is_owner(&self, owner: Principal) -> bool {
        self.owner == owner
    }
    
    pub fn add_actual_raised(&mut self, amount: u64) {
        self.actual_raised += amount;
    }
}

#[derive(Debug, Clone, CandidType, Deserialize, Default)]
pub struct Tokenomics {
    token: String,
    did: String,
    symbol: String,
    total_supply: u64,
    distribution: Vec<Distribution>,
}

#[derive(Debug, Clone, CandidType, Deserialize, Default)]
pub struct Distribution {
    team: String,
    marketing: String
}

#[derive(Debug, Clone, CandidType, Deserialize, Default)]
pub struct Team {
    name: String,
    position: String,
    twitter: Option<String>,
    picture: Blob,
    picture_id: u64,
}

#[derive(Debug, Clone, CandidType, Deserialize, Default)]
pub struct TrustBy {
    name: String,
    link: String,
    logo: Blob,
    logo_id: u64,
}

#[derive(Debug, Clone, CandidType, Deserialize, Default)]
pub struct CapitalDetail {
    raise: Raise,
    price_per_icp: u64,
    release: ReleaseRule,
}

#[derive(Debug, Clone, CandidType, Deserialize, Default)]
pub struct Raise {
    currency: String,
    amount: u64,
}

#[derive(Debug, Clone, CandidType, Deserialize, Default)]
pub struct ReleaseRule {
    method: ReleaseMethod,
    amount_per_day: u64,
    start_date: u64,
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub enum ReleaseMethod {
    Linear,
}

impl Default for ReleaseMethod {
    fn default() -> Self {
        Self::Linear
    }
}

/// Can merge partial property to ProjectProfile
pub trait MergeProject {
    fn id(&self) -> ProjectId;
    fn merge_profile(self, profile: &mut ProjectProfile);
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ProjectPage {
    pub data: Vec<ProjectProfile>,
    pub page_size: usize,
    pub page_num: usize,
    pub total_count: usize,
}
