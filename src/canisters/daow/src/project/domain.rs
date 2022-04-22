
use candid::{CandidType, Deserialize, Principal};

use crate::constant::EMPTY_STR;

pub type ProjectId = u64;

pub type Timestamp = u64;

pub type Blob = Vec<u8>;

// DAO progress statge
#[derive(Debug, Clone, CandidType, Deserialize)]
pub enum ProgressStage {
    Unopen,     // 未开始
    InProgress, // 进行中
    Completed,  // 已完成
}

// DAO project status
#[derive(Debug, Clone, CandidType, Deserialize)]
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

// DAO project data structure
#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ProjectProfile {
    pub id: ProjectId,
    pub name: String,
    pub logo: Blob,
    pub description: String,
    pub roadmap: Blob,
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
    pub memo: Option<String>,
    pub progress: ProgressStage,
    pub status: ProjectStatus,
    pub created_at: Timestamp,
    pub updated_at: Timestamp,
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
    picutre: Blob,
}

#[derive(Debug, Clone, CandidType, Deserialize, Default)]
pub struct TrustBy {
    name: String,
    link: String,
    logo: Blob,
}

#[derive(Debug, Clone, CandidType, Deserialize, Default)]
pub struct CapitalDetail {
    raise: Raise,
    price_per_icp: u8,
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
    Liner,
}

impl Default for ReleaseMethod {
    fn default() -> Self {
        Self::Liner
    }
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ProjectCreateCommand {
    pub name: String,
    // pub logo: Blob,
    // pub information: String,
    // pub owner_info: String,
    // pub wallet_addr: String,
    // pub contact_info: Vec<String>,
    // pub links: Vec<String>,
    // pub tags: Vec<String>,
    // pub memo: Option<String>,
}

impl ProjectCreateCommand {
    pub fn build_profile(self, id: ProjectId, owner: Principal, status: ProjectStatus, created_at: u64, updated_at: u64) -> ProjectProfile {
        ProjectProfile {
            id,
            name: self.name,
            logo: vec![],
            description: EMPTY_STR.into(),
            roadmap: vec![],
            tokenomics: Tokenomics::default(),
            team: Team::default(),
            trust_by: TrustBy::default(),
            capital_detail: CapitalDetail::default(),
            owner,
            owner_info: EMPTY_STR.into(),
            wallet_addr: EMPTY_STR.into(),
            contact_info: vec![],
            links: vec![],
            tags: vec![],
            memo: None,
            progress: ProgressStage::Unopen,
            status,
            created_at,
            updated_at,
        }
    }
}

pub trait MergeProject {
    fn merge_profile(self, profile: &mut ProjectProfile);
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ProjectApplyDescriptionCommand {
    pub id: u64,
    pub description: String,
}

impl MergeProject for ProjectApplyDescriptionCommand {
    fn merge_profile(self, profile: &mut ProjectProfile) {
        assert!(self.id == profile.id);
        
       profile.description = self.description
    }
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ProjectApplyRoadmapCommand {
    pub id: u64,
    pub roadmap: Blob,
}

impl MergeProject for ProjectApplyRoadmapCommand {
    fn merge_profile(self, profile: &mut ProjectProfile) {
        assert!(self.id == profile.id);
        
       profile.roadmap = self.roadmap;
    }
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ProjectApplyTokenomicsCommand {
    pub id: u64,
    pub tokenomics: Tokenomics,
}

impl MergeProject for ProjectApplyTokenomicsCommand {
    fn merge_profile(self, profile: &mut ProjectProfile) {
        assert!(self.id == profile.id);
        
       profile.tokenomics = self.tokenomics;
    }
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ProjectApplyTeamCommand {
    pub id: u64,
    pub team: Team,
}

impl MergeProject for ProjectApplyTeamCommand {
    fn merge_profile(self, profile: &mut ProjectProfile) {
        assert!(self.id == profile.id);
        
       profile.team = self.team;
    }
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ProjectApplyTrustByCommand {
    pub id: u64,
    pub trust_by: TrustBy,
}

impl MergeProject for ProjectApplyTrustByCommand {
    fn merge_profile(self, profile: &mut ProjectProfile) {
        assert!(self.id == profile.id);
        
       profile.trust_by = self.trust_by;
    }
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ProjectApplyCapitalDetailCommand {
    pub id: u64,
    pub capital_detail: CapitalDetail,
}

impl MergeProject for ProjectApplyCapitalDetailCommand {
    fn merge_profile(self, profile: &mut ProjectProfile) {
        assert!(self.id == profile.id);
        
       profile.capital_detail = self.capital_detail;
    }
}