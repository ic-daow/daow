use std::collections::BTreeMap;

use candid::Principal;

use super::{domain::{TransactionProfile, TransactionCreateCommand, TransactionUpdateCommand, TransactionPageQuery, TransactionPage}, error::TransactionError};


#[derive(Debug, Default)]
pub struct TransactionService {
    pub transactions: BTreeMap<u64, TransactionProfile>,
}

impl TransactionService {
    pub fn create_transaction(&mut self, cmd: TransactionCreateCommand, id: u64, caller: Principal, now: u64) -> Result<u64, TransactionError> {
        match self.transactions.get(&id) {
            Some(_) => Err(TransactionError::TransactionAlreadyExists),
            None => {             
                self.transactions.insert(
                    id,
                    cmd.build_profile(
                        id,
                        caller,
                        now,
                    )
                );
                Ok(id)            
            }
        }
    }

    pub fn get_transaction(&self, id: &u64) -> Option<TransactionProfile> {
        self.transactions.get(id).cloned()
    }

    pub fn update_transaction(&mut self, cmd: TransactionUpdateCommand) -> Result<bool, TransactionError> {
        match self.transactions
            .get_mut(&cmd.transaction_id) {
                Some(tx) => cmd.merge_profile(tx),
                _ => Err(TransactionError::TransactionNotFound)
            }
            
    }

    // 按 付款地址和收款地址模糊查询
    pub fn page_transactions(&self, query_args: TransactionPageQuery) -> TransactionPage {
        let data: Vec<TransactionProfile> = self.transactions
            .iter()
            .filter(|(_, q)| q.from.contains(&query_args.querystring) || q.to.contains(&query_args.querystring))
            .skip(query_args.page_num * query_args.page_size)
            .take(query_args.page_size)
            .map(|(_, q)| q.clone())
            .collect();

        let total_count = self.transactions.len();
        
        TransactionPage {
            data,
            page_size: query_args.page_size,
            page_num: query_args.page_num,
            total_count,
        }
    }

}