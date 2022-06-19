
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
        ProjectPage, ProgressStage,   
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
            .get_mut(&cmd.id)
            // .iter_mut()
            // .find(|(_, p)| p.name != cmd.name)
            .map(|p| { cmd.merge_profile(p); true })
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

    pub fn submit(&mut self, id: &u64, submit_time: u64) -> Result<bool, ProjectError> {
        
        match self.projects.get_mut(id) {
            Some(p) => {
                // 如果 提交 项目的时间比 提款 时间晚，返回错误
                if submit_time > p.capital_detail.release.start_date {
                    return Err(ProjectError::ProjectReleaseTimeTooEarly);
                }
                
                p.change_status(ProjectStatus::Enable);
                p.change_progress(ProgressStage::InProgress);
                p.refresh_update_at(submit_time);
                Ok(true)
            }
            None => Err(ProjectError::ProjectNotFound)
        }
    }

    pub fn add_actula_raised(&mut self, id: &u64, amount: u64) -> Result<bool, ProjectError> {
        self.projects
            .get_mut(id)
            .map(|p| {
                p.add_actual_raised(amount);
                true
            })
            .ok_or(ProjectError::ProjectNotFound)
    }

    pub fn update_claimed_info(&mut self, id: &u64, amount_e8s: u64, claim_time: u64) -> Result<(), ProjectError> {
        self.projects
            .get_mut(id)
            .map(|p| {
                p.add_claimed(amount_e8s);
                p.update_lastes_claim_time(claim_time)
            })
            .ok_or(ProjectError::ProjectNotFound)
    }

    pub fn delete_project(&mut self, id: &u64) -> Option<ProjectProfile> {
        self.projects.remove(id)
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

    pub fn find_projects_by_owner(&self, owner: &Principal) -> Vec<ProjectProfile> {
        self.projects
            .values()
            .filter(|p| p.is_owner(owner))
            .map(|p| p.clone())
            .collect()
    }

    pub fn find_projects_by_ids(&self, project_ids: &[u64]) -> Vec<ProjectProfile> {
        self.projects
            .iter()
            .filter(|(id, p)| project_ids.contains(id))
            .map(|(_, p)| p.clone())
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