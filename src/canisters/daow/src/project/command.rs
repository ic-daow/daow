
use candid::{CandidType, Deserialize, Principal};

use crate::common::constant::EMPTY_STR;

use super::domain::{Blob, ProjectId, ProjectStatus, ProjectProfile, Tokenomics, Team, TrustBy, CapitalDetail, MergeProject, ProgressStage};

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
    // pub memo: String,
}

impl ProjectCreateCommand {
    pub fn build_profile(self, id: ProjectId, owner: Principal, status: ProjectStatus, created_at: u64, updated_at: u64) -> ProjectProfile {
        ProjectProfile {
            id,
            name: self.name,
            logo: vec![],
            logo_id: 0,
            description: EMPTY_STR.into(),
            roadmap: vec![],
            roadmap_id: 0,
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
            memo: EMPTY_STR.into(),
            progress: ProgressStage::Unopen,
            actual_raised: 0,
            claimed: 0,
            latest_claim_at: None,
            status,
            created_at,
            updated_at,
        }
    }
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ProjectApplyDescriptionCommand {
    pub id: u64,
    pub description: String,
}

impl MergeProject for ProjectApplyDescriptionCommand {
    fn id(&self) -> ProjectId {
        self.id
    }

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
    fn id(&self) -> ProjectId {
        self.id
    }

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
    fn id(&self) -> ProjectId {
        self.id
    }

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
    fn id(&self) -> ProjectId {
        self.id
    }
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
    fn id(&self) -> ProjectId {
        self.id
    }
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
    fn id(&self) -> ProjectId {
        self.id
    }
    fn merge_profile(self, profile: &mut ProjectProfile) {
        assert!(self.id == profile.id);
        
       profile.capital_detail = self.capital_detail;
    }
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ProjectIdCommand {
    pub id: u64
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ProjectEditCommand {
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
}

impl MergeProject for ProjectEditCommand {
    fn id(&self) -> ProjectId {
        self.id
    }

    fn merge_profile(self, profile: &mut ProjectProfile) {
        assert!(self.id == profile.id);
        
        profile.name = self.name;
        profile.logo = self.logo;
        profile.logo_id = self.logo_id;
        profile.description = self.description;
        profile.roadmap = self.roadmap;
        profile.roadmap_id = self.roadmap_id;
        profile.tokenomics = self.tokenomics;
        profile.team = self.team;
        profile.trust_by = self.trust_by;
        profile.capital_detail = self.capital_detail;
        profile.owner = self.owner;
        profile.owner_info = self.owner_info;
        profile.wallet_addr = self.wallet_addr;
        profile.contact_info = self.contact_info;
        profile.links = self.links;
        profile.tags = self.tags;
        profile.memo = self.memo;
    }
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ProjectPageQuery {
    pub page_size: usize,
    pub page_num: usize,
    pub querystring: String,
}


#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct ProjectListQuery {
    pub status: String,
}

