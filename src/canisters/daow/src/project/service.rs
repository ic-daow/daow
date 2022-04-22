
use std::collections::BTreeMap;

use candid::Principal;

use super::domain::{
    ProjectProfile, 
    ProjectCreateCommand, 
    ProjectStatus, 
    ProjectApplyDescriptionCommand, 
    ProjectApplyRoadmapCommand, 
    ProjectApplyTokenomicsCommand, 
    ProjectApplyTeamCommand, 
    ProjectApplyTrustByCommand, 
    ProjectApplyCapitalDetailCommand, 
    Timestamp,
    MergeProject,
};

#[derive(Debug, Default)]
pub struct ProjectService {
    pub projects: BTreeMap<u64, ProjectProfile>,
}

impl ProjectService {

    pub fn create_project(&mut self, cmd: ProjectCreateCommand, id: u64, caller: Principal, now: Timestamp) -> Option<u64> {
        match self.projects.get(&id) {
            Some(_) => None,
            None => {
                self.projects.insert(
                    id,
                    cmd.build_profile(
                        id,
                        caller,
                        ProjectStatus::Pending,
                        now,
                        now,
                    )
                );
                Some(id)
            }
        }
    }

    pub fn get_project(&self, id: u64) -> Option<ProjectProfile> {
        self.projects.get(&id).cloned()
    }

    pub fn apply_project_desc(&mut self, cmd: ProjectApplyDescriptionCommand) -> bool {
        match self.projects.get_mut(&cmd.id) {
            Some(p) => {
                cmd.merge_profile(p);
                true
            },
            None => true
        }
    }

    pub fn apply_project_roadmap(&mut self, cmd: ProjectApplyRoadmapCommand) -> bool {
        match self.projects.get_mut(&cmd.id) {
            Some(p) => {
                cmd.merge_profile(p);
                true
            },
            None => true
        }
    }

    pub fn apply_project_tokenomics(&mut self, cmd: ProjectApplyTokenomicsCommand) -> bool {
        match self.projects.get_mut(&cmd.id) {
            Some(p) => {
                cmd.merge_profile(p);
                true
            },
            None => true
        }
    }

    pub fn apply_project_team(&mut self, cmd: ProjectApplyTeamCommand) -> bool {
        match self.projects.get_mut(&cmd.id) {
            Some(p) => {
                cmd.merge_profile(p);
                true
            },
            None => true
        }
    }

    pub fn apply_project_trust_by(&mut self, cmd: ProjectApplyTrustByCommand) -> bool {
        match self.projects.get_mut(&cmd.id) {
            Some(p) => {
                cmd.merge_profile(p);
                true
            },
            None => true
        }
    }

    pub fn apply_project_capital_detail(&mut self, cmd: ProjectApplyCapitalDetailCommand) -> bool {
        match self.projects.get_mut(&cmd.id) {
            Some(p) => {
                cmd.merge_profile(p);
                true
            },
            None => true
        }
    }
}

#[cfg(test)]
mod tests {
    use candid::Principal;

    use crate::{project::domain::{ProjectCreateCommand, ProjectApplyDescriptionCommand}, env::TestEnvironment};

    use crate::DaoContext;

    #[test]
    fn create_project_works() {
        let mut context = DaoContext {
            env: Box::new(TestEnvironment { now: 123, caller: Principal::anonymous(), canister_id: Principal::anonymous() }),
            ..DaoContext::default()
        };
        let cmd1 = ProjectCreateCommand { name : "Hackathon".to_string() };
        let res1 = context.project_service.create_project(cmd1, 1, Principal::anonymous(), 123);
        println!("{:?}", res1);
        assert!(res1.is_some());
    }

    #[test]
    fn create_project_and_description_works() {
        let mut context = DaoContext {
            env: Box::new(TestEnvironment { now: 123, caller: Principal::anonymous(), canister_id: Principal::anonymous() }),
            ..DaoContext::default()
        };
        let cmd1 = ProjectCreateCommand { name : "Hackathon".to_string() };
        let res1 = context.project_service.create_project(cmd1, 2, Principal::anonymous(), 1234);
        println!("{:?}", res1);
        assert!(res1.is_some());

        let cmd2 = ProjectApplyDescriptionCommand { id: res1.unwrap(), description: "Desc".into() };
        let res2 = context.project_service.apply_project_desc(cmd2);
        assert!(res2);
        
        assert_eq!(context.project_service.get_project(res1.unwrap()).unwrap().description, "Desc".to_string());
    }
}