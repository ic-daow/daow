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

    // 确认 transation 是否 finalize, 如果确认成功，返回 确认的金额
    pub fn finalize_transaction(&mut self, block_height: u64, memo: u64, project_id: u64) -> Result<u64, TransactionError> {
        self.transactions
            .iter_mut()
            .find(|(_, tx)| { 
                tx.block_height == block_height && tx.project_id == project_id
            })
            .map(|(_, tx)| -> u64 { 
                tx.is_finalize = true; tx.amount 
            })
            .ok_or(TransactionError::TransactionBlockHeightNotValid)
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

    // 获取指定 principal 对 指定 project 的募资金额，可能有多次, 计算累计
    pub fn accumulate_invest(&self, project_id: u64, investor: Principal) -> u64 {
        self.transactions
            .iter()
            .filter(|(_, tx)| tx.from_principal == investor && tx.project_id == project_id)
            .map(|(_, tx)| tx.amount)
            .sum()
    }

    // 按投资者查询 project id
    pub fn find_projects_by_investor(&self, investor: &Principal) -> Vec<u64> {
        self.transactions
            .values()
            .filter(|tx| tx.from_principal == *investor)
            .map(|tx| tx.project_id)
            .collect()
    }

}