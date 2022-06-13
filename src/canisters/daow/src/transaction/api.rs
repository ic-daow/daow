
use candid::Principal;
use ic_cdk::api::call::CallResult;
use ic_cdk_macros::*;
use ic_ledger_types::{BlockIndex, GetBlocksArgs, MAINNET_LEDGER_CANISTER_ID, Block};

use crate::CONTEXT;

use super::{
    domain::*, 
    error:: TransactionError,
};

#[update] 
fn create_transaction(cmd: TransactionCreateCommand) -> Result<TransactionId, TransactionError> {
    CONTEXT.with(|c| {      
        let mut ctx = c.borrow_mut();
        let id = ctx.id;
        let caller = ctx.env.caller();
        let now = ctx.env.now();

        match ctx.project_service.get_project(cmd.project_id) {
            Some(p) if p.valid_status() && p.valid_progress() => {
                
                ctx.transaction_service
                    .create_transaction(cmd, id, caller, now)   
                    .map(|id| {
                        ctx.id += 1;
                        id
                    })
            }
            _ => Err(TransactionError::ProjectInvalid)
        }
        
    })
}

#[update]
fn edit_transaction(cmd: TransactionUpdateCommand) -> Result<bool, TransactionError> {
    CONTEXT.with(|c| c.borrow_mut().transaction_service.update_transaction(cmd))
}

#[update]
pub async fn valid_transaction(cmd: TransactionValidCommand) -> Result<bool, TransactionError> {
    let block_height = cmd.block_height;
    let project_id = cmd.project_id;
    match query_one_block(MAINNET_LEDGER_CANISTER_ID, block_height).await {
        Ok(Some(block)) => {
            let memo = block.transaction.memo.0;

            CONTEXT.with(|c| {
                let mut ctx = c.borrow_mut();
                
                let res = ctx.transaction_service.finalize_transaction(block_height, memo, project_id);
                
                // 确认 投资人捐成功后，增加 项目实际的 募资金额 ICP
                if let Ok(amount) = res {
                    if ctx.project_service.add_actula_raised(&project_id, amount).is_err() {
                        return Err(TransactionError::ProjectInvalid);
                    }
                }

                res.map(|_| true)
            })
        }
        _ => Err(TransactionError::TransactionBlockHeightNotValid)
        
    } 
}

async fn query_one_block(ledger: Principal, block_index: BlockIndex) -> CallResult<Option<Block>> {
    let args = GetBlocksArgs { start: block_index, length: 1 };
 
    let blocks_result = ic_ledger_types::query_blocks(ledger, args.clone()).await?;
 
    if !blocks_result.blocks.is_empty() {
        debug_assert_eq!(blocks_result.first_block_index, block_index);
        return Ok(blocks_result.blocks.into_iter().next());
    }
 
    if let Some(func) = blocks_result
        .archived_blocks
        .into_iter()
        .find_map(|b| (b.start <= block_index && (block_index - b.start) < b.length).then(|| b.callback)) {
        if let Ok(range) = ic_ledger_types::query_archived_blocks(&func, args).await? {
            return Ok(range.blocks.into_iter().next())
        }
    }
    Ok(None)
}


// #[update]
// async fn transfer(args: TransferArgs) -> Result<BlockIndex, String> {
//     ic_cdk::println!("Transferring {} tokens to principal {} subaccount {:?}", &args.amount, &args.to_principal, &args.to_subaccount);
//     let ledger_canister_id = CONF.with(|conf| conf.borrow().ledger_canister_id);
//     let to_subaccount = args.to_subaccount.unwrap_or(DEFAULT_SUBACCOUNT);
//     let transfer_args = CONF.with(|conf| {
//         let conf = conf.borrow();
//         ic_ledger_types::TransferArgs {
//             memo: Memo(0),
//             amount: args.amount,
//             fee: conf.transaction_fee,
//             from_subaccount: conf.subaccount,
//             to: AccountIdentifier::new(&args.to_principal, &to_subaccount),
//             created_at_time: None,
//         }
//     });
//     ic_ledger_types::transfer(ledger_canister_id, transfer_args).await
//         .map_err(|e| format!("failed to call ledger: {:?}", e))?
//         .map_err(|e| format!("ledger transfer error {:?}", e))
// }

#[query]
fn get_transaction(cmd: TransactionIdCommand) -> Result<TransactionProfile, TransactionError> {
    CONTEXT.with(|c| c.borrow().transaction_service.get_transaction(&cmd.id)).ok_or(TransactionError::TransactionNotFound)
}

#[query]
fn page_transactions(query_args: TransactionPageQuery) -> Result<TransactionPage, TransactionError> {
    CONTEXT.with(|c| Ok(c.borrow().transaction_service.page_transactions(query_args)))
}