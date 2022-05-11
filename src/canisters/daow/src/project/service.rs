
use std::collections::BTreeMap;

use candid::Principal;

use super::{
    command::{       
        ProjectCreateCommand,       
        ProjectPageQuery, 
        ProjectListQuery, ProjectEditCommand, 
    },
    domain::{
        MergeProject,
        ProjectProfile, 
        ProjectStatus, 
        Timestamp,
        ProjectPage,   
    }, error::ProjectError,
};

#[derive(Debug, Default)]
pub struct ProjectService {
    pub projects: BTreeMap<u64, ProjectProfile>,
}

impl ProjectService {

    pub fn create_project(&mut self, cmd: ProjectCreateCommand, id: u64, caller: Principal, now: Timestamp) -> Result<u64, ProjectError> {
        match self.projects.get(&id) {
            Some(_) => Err(ProjectError::ProjectAlreadyExists),
            None => {
                match self.projects.iter().find(|(_, p)| p.name == cmd.name) {
                    Some(_) => Err(ProjectError::ProjectAlreadyExists),
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
                        Ok(id)
                    }
                }
                
            }
        }
    }

    pub fn get_project(&self, id: u64) -> Option<ProjectProfile> {
        self.projects.get(&id).cloned()
    }

    pub fn edit_project(&mut self, cmd: ProjectEditCommand) -> Result<bool, ProjectError> {
        self.projects
            .iter_mut()
            .find(|(_, p)| p.name != cmd.name)
            .map(|(_, p)| { cmd.merge_profile(p); true })
            .ok_or(ProjectError::ProjectAlreadyExists)
    }

    pub fn merge_profile(&mut self, cmd: impl MergeProject) -> Option<bool> {
        self.projects
            .get_mut(&cmd.id())
            .map(|p| { 
                cmd.merge_profile(p); 
                true 
            })
    }

    pub fn delete_project(&mut self, id: u64) -> Option<ProjectProfile> {
        self.projects.remove(&id)
    }

    pub fn page_projects(&self, query_args: ProjectPageQuery) -> ProjectPage {
        let data: Vec<ProjectProfile> = self.projects
            .iter()
            .filter(|(_, q)| q.name.contains(&query_args.querystring))
            .skip(query_args.page_num * query_args.page_size)
            .take(query_args.page_size)
            .map(|(_, q)| q.clone())
            .collect();

        let total_count = self.projects.len();
        
        ProjectPage {
            data,
            page_size: query_args.page_size,
            page_num: query_args.page_num,
            total_count,
        }
    }

    pub fn list_projects(&self, query_args: ProjectListQuery) -> Vec<ProjectProfile> {
        self.projects
            .iter()
            .filter(|(_k, v)| query_args.status.parse::<ProjectStatus>().unwrap() == v.status)
            .map(|(_k, v)| v.clone())
            .collect()
    }
}

#[cfg(test)]
mod tests {
    use candid::Principal;

    use crate::{project::command::{ProjectCreateCommand, ProjectApplyDescriptionCommand}, env::TestEnvironment};

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
        let res2 = context.project_service.merge_profile(cmd2);
        assert!(res2.is_some());
        
        assert_eq!(context.project_service.get_project(res1.unwrap()).unwrap().description, "Desc".to_string());
    }
}