

use ic_cdk_macros::*;


use crate::CONTEXT;
use super::{
    domain::*, 
    command::*,
    error:: ProjectError,
};

#[update]
fn create_project(cmd: ProjectCreateCommand) -> Result<ProjectId, ProjectError> {
    CONTEXT.with(|c| {      
        let mut ctx = c.borrow_mut();
        let id = ctx.id;
        let caller = ctx.env.caller();
        let now = ctx.env.now();

        ctx.project_service
            .create_project(cmd, id, caller, now)   
            .map(|id| {
                ctx.id += 1;
                id
            })
        // match ctx.project_service.create_project(cmd, id, caller, now) {
        //     Ok(id) => {
        //         ctx.id += 1;
        //         Ok(id)
        //     },
        //     e => e,
        // }
    })
}

#[update]
fn apply_project_description(cmd: ProjectApplyDescriptionCommand) -> Result<bool, ProjectError> {
    merge_project_profile(cmd)
}

#[update]
fn apply_project_roadmap(cmd: ProjectApplyRoadmapCommand) -> Result<bool, ProjectError> {
    merge_project_profile(cmd)
}

#[update]
fn apply_project_tokenomics(cmd: ProjectApplyTokenomicsCommand) -> Result<bool, ProjectError> {
    merge_project_profile(cmd)
}

#[update]
fn apply_project_trust_by(cmd: ProjectApplyTrustByCommand) -> Result<bool, ProjectError> {
    merge_project_profile(cmd)
}

#[update]
fn apply_project_team(cmd: ProjectApplyTeamCommand) -> Result<bool, ProjectError> {
    merge_project_profile(cmd)
}

#[update]
fn apply_project_capital_detail(cmd: ProjectApplyCapitalDetailCommand) -> Result<bool, ProjectError> {
    merge_project_profile(cmd)
}

#[update]
fn edit_project(cmd: ProjectEditCommand) -> Result<bool, ProjectError> {
    CONTEXT.with(|c| c.borrow_mut().project_service.edit_project(cmd))
}

#[update]
fn submit_project(cmd: ProjectIdCommand) -> Result<bool, ProjectError> {
    CONTEXT.with(|c| c.borrow_mut().project_service.submit(&cmd.id))
}

#[update]
fn delete_project(cmd: ProjectIdCommand) -> Result<bool, ProjectError> {
    CONTEXT.with(|c| {      
        c.borrow_mut().project_service.delete_project(&cmd.id).map(|_| true).ok_or(ProjectError::ProjectNotFound)
    })
}

fn merge_project_profile(cmd: impl MergeProject) -> Result<bool, ProjectError> {
    CONTEXT.with(|c| c.borrow_mut().project_service.merge_profile(cmd)).ok_or(ProjectError::ProjectNotFound)
}

#[query]
fn get_project(cmd: ProjectIdCommand) -> Result<ProjectProfile, ProjectError> {
    CONTEXT.with(|c| c.borrow().project_service.get_project(cmd.id)).ok_or(ProjectError::ProjectNotFound)
}

#[query]
fn page_projects(query_args: ProjectPageQuery) -> Result<ProjectPage, ProjectError> {
    CONTEXT.with(|c| Ok(c.borrow().project_service.page_projects(query_args)))
}

#[query]
fn list_projects(q: ProjectListQuery) -> Result<Vec<ProjectProfile>, ProjectError> {
    CONTEXT.with(|c| Ok(c.borrow().project_service.list_projects(q)))
}