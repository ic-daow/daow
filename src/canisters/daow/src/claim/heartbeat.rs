
use candid::Principal;
use ic_cdk_macros::heartbeat;

use ic_ledger_types::{BlockIndex, MAINNET_LEDGER_CANISTER_ID, DEFAULT_FEE, Tokens, DEFAULT_SUBACCOUNT, Memo, AccountIdentifier};

use crate::CONTEXT;

use super::domain::{ClaimProposal, ProposalState, TransferCommand};


#[heartbeat]
async fn heartbeat() {
    execute_accepted_claim_proposals().await;
}

/// Execute all claim proposal
async fn execute_accepted_claim_proposals() {
    let accepted_proposals: Vec<ClaimProposal> = CONTEXT.with(|c| {
        c.borrow_mut()
            .claim_service
            .executing_accepted_proposals()
    });

    for proposal in accepted_proposals {
        let state = match execute_claim_proposal(proposal.clone()).await {
            Ok(()) => ProposalState::Succeeded,
            Err(msg) => ProposalState::Failed(msg)
        };

        CONTEXT.with(|c| c.borrow_mut().claim_service.update_proposal_state(proposal.id, state))
    }
}

async fn execute_claim_proposal(proposal: ClaimProposal) -> Result<(), String> {
   
    let recipient_principal = proposal.payload.recipient_principal.clone();
    let cmd = TransferCommand {
        amount_e8s: proposal.payload.amount_e8s,
        recipient_principal,
    };

     // 转账 ICP 
    let _ = transfer(cmd).await?;
    
    // 更新 项目 Claimed 的数量
    CONTEXT.with(|c| {
        let mut ctx = c.borrow_mut();
        ctx.project_service
            .add_claimed_amount_e8s(&proposal.payload.project_id, proposal.payload.amount_e8s)
            .map_err(|_| "project not found".to_string())
    })

}

async fn transfer(cmd: TransferCommand) -> Result<BlockIndex, String> {
    ic_cdk::println!("Transferring {} tokens to principal {} ", &cmd.amount_e8s, &cmd.recipient_principal);
    let ledger_canister_id = MAINNET_LEDGER_CANISTER_ID;
    let to_subaccount = DEFAULT_SUBACCOUNT;
    let to_principal = Principal::from_text(cmd.recipient_principal).or(Err("Recipient format is wrong!"))?;

    let transfer_args = ic_ledger_types::TransferArgs {
        memo: Memo(0),
        amount: Tokens::from_e8s(cmd.amount_e8s),
        fee: DEFAULT_FEE,
        from_subaccount: None,
        to: AccountIdentifier::new(&to_principal, &to_subaccount),
        created_at_time: None,
    };

    ic_ledger_types::transfer(ledger_canister_id, transfer_args).await
        .map_err(|e| format!("failed to call ledger: {:?}", e))?
        .map_err(|e| format!("ledger transfer error {:?}", e))
}

