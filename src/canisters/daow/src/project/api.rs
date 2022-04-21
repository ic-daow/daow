

use ic_cdk_macros::*;


use crate::CONTEXT;
use super::{domain::*, response::{ProjectCreatedResult, ProjectCreatedError}};

#[update]
fn create_project(cmd: ProjectCreateCommand) -> ProjectCreatedResult {
    CONTEXT.with(|c| {      
        // c.borrow_mut().create_project(cmd)
        match c.borrow_mut().create_project(cmd) {
            Some(id) => ProjectCreatedResult::Ok(id),
            None => ProjectCreatedResult::Err(ProjectCreatedError::ProjectAlreadyExists),
        }
    })
}

#[update]
fn apply_project_description(cmd: ProjectApplyDescriptionCommand) -> bool {
    CONTEXT.with(|c| c.borrow_mut().apply_project_desc(cmd))
}

#[update]
fn apply_project_roadmap(cmd: ProjectApplyRoadmapCommand) -> bool {
    CONTEXT.with(|c| c.borrow_mut().apply_project_roadmap(cmd))
}

#[update]
fn apply_project_tokenomics(cmd: ProjectApplyTokenomicsCommand) -> bool {
    CONTEXT.with(|c| c.borrow_mut().apply_project_tokenomics(cmd))
}

#[update]
fn apply_project_trust_by(cmd: ProjectApplyTrustByCommand) -> bool {
    CONTEXT.with(|c| c.borrow_mut().apply_project_trust_by(cmd))
}

#[update]
fn apply_project_team(cmd: ProjectApplyTeamCommand) -> bool {
    CONTEXT.with(|c| c.borrow_mut().apply_project_team(cmd))
}

#[update]
fn apply_project_capital_detail(cmd: ProjectApplyCapitalDetailCommand) -> bool {
    CONTEXT.with(|c| c.borrow_mut().apply_project_capital_detail(cmd))
}