
use candid::{CandidType, Deserialize, Principal};
use ic_ledger_types::{Tokens, Subaccount};
use serde::Serialize;

use super::error::TransactionError;

pub type TransactionId = u64;

pub type Timestamp = u64;

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct TransactionProfile {
    pub id: TransactionId,
    pub from_principal: Principal,
    pub from: String,   // ICP 交易付款地址
    pub to: String,     // ICP 交易收款地址
    pub amount: u64,    // ICP 付款金额,放大1亿倍, e.g. 1 ICP = 100,000,000
    pub block_height: u64,  // 交易记录在ICP ledger 的区块高度
    pub memo: u64,       // 转账时的 memo, 随机数
    pub project_id: u64,
    pub is_finalize: bool,  // 付款交易已经链上最终确认
    pub created_at: Timestamp,
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct TransactionCreateCommand {
    pub from: String,
    pub to: String,
    pub amount: u64,
    pub memo : u64,
    pub project_id: u64,
}

impl TransactionCreateCommand {
    pub fn build_profile(self, id: u64, from_principal: Principal, created_at: Timestamp) -> TransactionProfile {
        TransactionProfile { 
            id, 
            from_principal, 
            from: self.from, 
            to: self.to, 
            amount: self.amount, 
            block_height: 0, 
            memo: self.memo, 
            project_id: self.project_id,
            is_finalize: false, 
            created_at
        }
    }
}
#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct TransactionUpdateCommand {
    pub transaction_id: TransactionId,
    pub amount: u64,
    pub memo: u64,
    pub project_id: u64,
    pub block_height: u64,
}

impl TransactionUpdateCommand {
    pub fn merge_profile(self, profile: &mut TransactionProfile) -> Result<bool, TransactionError> {
        if self.transaction_id == profile.id && self.amount == profile.amount && self.project_id == profile.project_id {
            profile.block_height = self.block_height;
            
            Ok(true)
        } else {
            Err(TransactionError::TransactionNotFound)
        }
    }
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct TransactionIdCommand {
    pub id: TransactionId,
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct TransactionPageQuery {
    pub page_size: usize,
    pub page_num: usize,
    pub querystring: String,
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct TransactionPage {
    pub data: Vec<TransactionProfile>,
    pub page_size: usize,
    pub page_num: usize,
    pub total_count: usize,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug, Hash)]
pub struct TransferArgs {
    amount: Tokens,
    to_principal: Principal,
    to_subaccount: Option<Subaccount>,
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct TransactionValidCommand {
    pub block_height: u64,
    pub project_id: u64,
}
