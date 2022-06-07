
use ic_cdk_macros::*;

use crate::CONTEXT;
use super::{
    domain::*, 
    error:: ClaimError,
};

#[update] 
fn submit_claim_proposal(payload: ProposalPayload) -> Result<u64, ClaimError> {
    CONTEXT.with(|c| {      
        let mut ctx = c.borrow_mut();
        let id = ctx.id;
        let caller = ctx.env.caller();
        let now = ctx.env.now();

        match ctx.project_service.get_project(payload.project_id) {
            Some(p) if p.can_claiming() => {
                let proposal = payload.build_proposal(id, caller, now);
                ctx.claim_service
                    .insert_proposal(proposal)   
                    .map(|id| {
                        ctx.id += 1;
                        id
                    })
            }
            _ => Err(ClaimError::ProjectInvalid)
        }
        
    })
}

#[update]
fn vote_claim_proposal(args: VoteArgs) -> Result<ProposalState, ClaimError> {
    CONTEXT.with(|c| c.borrow_mut().claim_service.vote_proposal(args))
}

#[query]
fn get_claim_proposal(q: ClaimProposalGetQuery) -> Result<ClaimProposal, ClaimError> {
    CONTEXT.with(|c| c.borrow().claim_service.get_proposal(&q.id)).ok_or(ClaimError::ProposalNotFound)
}

#[query]
fn page_claim_proposals(q: ClaimProposalPageQuery) -> Result<ClaimProposalPage, ClaimError> {
    CONTEXT.with(|c| Ok(c.borrow().claim_service.page_proposals(q)))
}