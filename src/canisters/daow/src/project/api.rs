

use ic_cdk_macros::*;


use crate::CONTEXT;
use super::{domain::*, response::{ProjectCreatedResult, ProjectCreatedError}};

#[update]
fn create_project(cmd: ProjectCreateCommand) -> ProjectCreatedResult {
    CONTEXT.with(|c| {      
        let mut ctx = c.borrow_mut();
        let id = ctx.id;
        let caller = ctx.env.caller();
        let now = ctx.env.now();
        match ctx.project_service.create_project(cmd, id, caller, now) {
            Some(id) => {
                ctx.id += 1;
                ProjectCreatedResult::Ok(id)
            },
            None => ProjectCreatedResult::Err(ProjectCreatedError::ProjectAlreadyExists),
        }
    })
}

#[update]
fn apply_project_description(cmd: ProjectApplyDescriptionCommand) -> bool {
    CONTEXT.with(|c| c.borrow_mut().project_service.apply_project_desc(cmd))
}

#[update]
fn apply_project_roadmap(cmd: ProjectApplyRoadmapCommand) -> bool {
    CONTEXT.with(|c| c.borrow_mut().project_service.apply_project_roadmap(cmd))
}

#[update]
fn apply_project_tokenomics(cmd: ProjectApplyTokenomicsCommand) -> bool {
    CONTEXT.with(|c| c.borrow_mut().project_service.apply_project_tokenomics(cmd))
}

#[update]
fn apply_project_trust_by(cmd: ProjectApplyTrustByCommand) -> bool {
    CONTEXT.with(|c| c.borrow_mut().project_service.apply_project_trust_by(cmd))
}

#[update]
fn apply_project_team(cmd: ProjectApplyTeamCommand) -> bool {
    CONTEXT.with(|c| c.borrow_mut().project_service.apply_project_team(cmd))
}

#[update]
fn apply_project_capital_detail(cmd: ProjectApplyCapitalDetailCommand) -> bool {
    CONTEXT.with(|c| c.borrow_mut().project_service.apply_project_capital_detail(cmd))
}