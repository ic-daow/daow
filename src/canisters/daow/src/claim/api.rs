
use ic_cdk_macros::*;

use crate::{CONTEXT, common::constant::TIME_NANOS_PER_DAY};
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
            Some(p) if p.can_claiming(&caller) => {

                // let claim_duration_nanos = if p.latest_claim_at.is_some() {
                //     (now - p.latest_claim_at.unwrap()) / 864000 
                // } else {
                //     p.capital_detail.release.start_date
                // };

                // let claim_max_amount = claim_duration_nanos / TIME_NANOS_PER_DAY * p.capital_detail.release.amount_per_day;

                // if payload.amount_e8s > claim_max_amount  {
                //     return Err(ClaimError::ClaimAmountExceedUpperLimit);
                // }

                let actual_raised = p.actual_raised;
                // 投票通过阀值超过半数
                let vote_threshold = Weights {
                    amount_e8s: (actual_raised / 2) + 1
                };
                let proposal = payload.build_proposal(id, caller, vote_threshold, now);

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
    CONTEXT.with(|c| {
        let mut ctx = c.borrow_mut();
        let voter = ctx.env.caller();
        
        let project_id = ctx.claim_service
            .get_proposal(&args.proposal_id)
            .map(|p| p.payload.project_id)
            .ok_or(ClaimError::ProposalNotFound)?;

        let vote_amount = ctx.transaction_service.accumulate_invest(project_id, voter);
        let vote_weights = Weights { amount_e8s: vote_amount };

        let cmd = ClaimVoteCommand {
            proposal_id: args.proposal_id,
            vote: args.vote,
            voter,
            vote_weights,
        };

        ctx.claim_service.vote_proposal(cmd)
    })
}

#[query]
fn get_claim_proposal(q: ClaimProposalGetQuery) -> Result<ClaimProposal, ClaimError> {
    CONTEXT.with(|c| c.borrow().claim_service.get_proposal(&q.id)).ok_or(ClaimError::ProposalNotFound)
}

#[query]
fn page_claim_proposals(q: ClaimProposalPageQuery) -> Result<ClaimProposalPage, ClaimError> {
    CONTEXT.with(|c| Ok(c.borrow().claim_service.page_proposals(q)))
}