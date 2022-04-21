
use candid::{CandidType, Deserialize, Principal};
use std::collections::BTreeMap;
use std::iter::FromIterator;

use crate::env::{Environment, CanisterEnvironment, EmptyEnvironment};
use crate::project::domain::{
    ProjectProfile, 
    ProjectCreateCommand, 
    ProjectStatus, 
    ProjectApplyDescriptionCommand, 
    ProjectApplyRoadmapCommand, 
    ProjectApplyTokenomicsCommand, ProjectApplyTeamCommand, ProjectApplyTrustByCommand, ProjectApplyCapitalDetailCommand
};
use crate::user::domain::{UserProfile, UserRegisterCommand, UserStatus};

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct DaoDataStarage {
    pub id: u64,
    pub users: Vec<UserProfile>,
    pub projects: Vec<ProjectProfile>,
}

impl From<DaoContext> for DaoDataStarage {
    fn from(state: DaoContext) -> Self {
        let id = state.id;
        let users = Vec::from_iter(state.users
            .iter()
            .map(|(_k, v)| (v.clone())));
        let projects = Vec::from_iter(state.projects
            .iter()
            .map(|(_k, v)| (v.clone())));

        Self {
            id,
            users,
            projects,
        }
    }
}

pub struct DaoContext {
    pub env: Box<dyn Environment>,
    pub id: u64,
    pub users: BTreeMap<Principal, UserProfile>,
    pub projects: BTreeMap<u64, ProjectProfile>,
}

impl Default for DaoContext {
    fn default() -> Self {
        Self {
            env: Box::new(EmptyEnvironment {}),
            id: 10001,
            users: BTreeMap::new(),
            projects: BTreeMap::new(),
        }
    }
}

impl From<DaoDataStarage> for DaoContext {
    fn from(payload: DaoDataStarage) -> Self {
        let users: BTreeMap<Principal, UserProfile> = payload
            .users
            .into_iter()
            .map(|u| (u.owner, u))
            .collect();
        let projects: BTreeMap<u64, ProjectProfile> = payload
            .projects
            .into_iter()
            .map(|p| (p.id, p))
            .collect();

        Self {
            env: Box::new(CanisterEnvironment {}),
            id: payload.id,
            users,
            projects
        }
    }
}

impl DaoContext {
    pub fn register_user(&mut self, cmd: UserRegisterCommand) -> Option<Principal> {
        let id = self.id;
        let _caller = self.env.caller();
        match self.users.get(&_caller) {
            Some(_) => None,
            None => {
                self.users.insert(
                    _caller,
                    cmd.build_profile(
                        id,
                        _caller,
                        UserStatus::Enable,
                        self.env.now()
                    )
                );
                self.id += 1;
                Some(_caller)
            }
        }       
    }

    // pub fn get_self(&self) -> Option<UserProfile> {
    //    self.users.get(&self.env.caller()).cloned()
    // }

    pub fn get_user(&self, principal: Principal) -> Option<UserProfile> {
        self.users.get(&principal).cloned()    
    }

    pub fn create_project(&mut self, cmd: ProjectCreateCommand) -> Option<u64> {
        let caller = self.env.caller();
        let id = self.id;
        let now = self.env.now();
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
                self.id += 1;
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

    use super::DaoContext;

    #[test]
    fn create_project_works() {
        let mut context = DaoContext {
            env: Box::new(TestEnvironment { now: 123, caller: Principal::anonymous(), canister_id: Principal::anonymous() }),
            ..DaoContext::default()
        };
        let cmd1 = ProjectCreateCommand { name : "Hackathon".to_string() };
        let res1 = context.create_project(cmd1);
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
        let res1 = context.create_project(cmd1);
        println!("{:?}", res1);
        assert!(res1.is_some());

        let cmd2 = ProjectApplyDescriptionCommand { id: res1.unwrap(), description: "Desc".into() };
        let res2 = context.apply_project_desc(cmd2);
        assert!(res2);
        
        assert_eq!(context.get_project(res1.unwrap()).unwrap().description, "Desc".to_string());
    }
}

// pub trait Interaction {
//     fn create_project(&mut self, cmd: ProjectCreateCommand) -> Option<u64>;
// }

// impl Interaction for DaoContext {
//     fn create_project(&mut self, cmd: ProjectCreateCommand) -> Option<u64> {
//         let caller = self.env.caller();
//         let id = self.id;
//         let now = self.env.now();
//         match self.projects.get(&id) {
//             Some(_) => None,
//             None => {
//                 self.projects.insert(
//                     id,
//                     cmd.build_profile(
//                         id,
//                         caller,
//                         ProjectStatus::Pending,
//                         now,
//                         now,
//                     )
//                 );
//                 self.id += 1;
//                 Some(id)
//             }
//         }
//     }
// }
