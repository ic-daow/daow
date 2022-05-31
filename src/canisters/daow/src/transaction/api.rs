
use ic_cdk_macros::*;

use crate::CONTEXT;
use super::{
    domain::*, 
    error:: TransactionError,
};

#[update] 
fn create_transactoin(cmd: TransactionCreateCommand) -> Result<TransactionId, TransactionError> {
    CONTEXT.with(|c| {      
        let mut ctx = c.borrow_mut();
        let id = ctx.id;
        let caller = ctx.env.caller();
        let now = ctx.env.now();

        ctx.transaction_service
            .create_transaction(cmd, id, caller, now)   
            .map(|id| {
                ctx.id += 1;
                id
            })
    })
}

#[update]
fn edit_transaction(cmd: TransactionUpdateCommand) -> Result<bool, TransactionError> {
    CONTEXT.with(|c| c.borrow_mut().transaction_service.update_transaction(cmd))
}

#[query]
fn get_transaction(cmd: TransactionIdCommand) -> Result<TransactionProfile, TransactionError> {
    CONTEXT.with(|c| c.borrow().transaction_service.get_transaction(&cmd.id)).ok_or(TransactionError::TransactionNotFound)
}

#[query]
fn page_transactions(query_args: TransactionPageQuery) -> Result<TransactionPage, TransactionError> {
    CONTEXT.with(|c| Ok(c.borrow().transaction_service.page_transactions(query_args)))
}