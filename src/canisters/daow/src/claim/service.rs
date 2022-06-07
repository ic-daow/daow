
use std::collections::BTreeMap;

use super::{domain::*, error::ClaimError};


#[derive(Debug, Default)]
pub struct ClaimService {
    pub proposals: BTreeMap<u64, ClaimProposal>,
}

impl ClaimService {
    pub fn insert_proposal(&mut self, proposal: ClaimProposal) -> Result<u64, ClaimError> {
        let proposal_id = proposal.id;
        match self.proposals.get(&proposal_id) {
            Some(_) => Err(ClaimError::ProposalAlreadyExists),
            None => {             
                self.proposals.insert(proposal_id, proposal);
                Ok(proposal_id)            
            }
        }
    }

    // TODO
    pub fn vote_proposal(&mut self, args: VoteArgs) -> Result<ProposalState, ClaimError> {
        todo!()
    }

    pub fn get_proposal(&self, id: &u64) -> Option<ClaimProposal> {
        self.proposals.get(id).cloned()
    }

    // 分页查询 claim proposal
    pub fn page_proposals(&self, q: ClaimProposalPageQuery) -> ClaimProposalPage {
        let data: Vec<ClaimProposal> = self.proposals
            .iter()
            .filter(|(_, p)| p.proposer.to_string().contains(q.querystring.as_str()))
            .skip(q.page_num * q.page_size)
            .take(q.page_size)
            .map(|(_, q)| q.clone())
            .collect();

        let total_count = self.proposals.len();
        
        ClaimProposalPage {
            data,
            page_size: q.page_size,
            page_num: q.page_num,
            total_count,
        }
    }

}