
use std::iter::FromIterator;

use candid::{encode_args, Principal, Nat, CandidType, Deserialize};
use ic_cdk::{caller, id, print};
use ic_cdk_macros::*;
use ic_cdk::storage;
use ic_ledger_types::{MAINNET_LEDGER_CANISTER_ID, AccountBalanceArgs, AccountIdentifier, DEFAULT_SUBACCOUNT, Tokens};
use log::{debug, error, info};
use serde::Serialize;

use crate::common::constant::CYCLES_PER_DFT_CANISTER;
use crate::context::{DaoContext, DaoDataStorage, DFT_STANDARD_WASM};

use crate::CONTEXT;
use crate::env::CanisterEnvironment;
// use crate::canister_management::management::{CreateCanisterArgs, CanisterSettings, ICManagementAPI, IICManagementAPI};

#[query]
fn next_id() -> u64 {
    CONTEXT.with(|s| s.borrow().id)
}

#[query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

#[query]
fn get_caller() -> String {
    caller().to_string()
}

#[query] 
fn get_account_id() -> String {
    CONTEXT.with(|c| ic_ledger_types::AccountIdentifier::new(&c.borrow().env.canister_id(), &DEFAULT_SUBACCOUNT).to_string())
}

#[init]
fn init_cainster() {
    ic_cdk::setup();

    let context = DaoContext {
        env: Box::new(CanisterEnvironment {}),
        ..DaoContext::default()
    };

    CONTEXT.with(|c| *c.borrow_mut() = context);
}

#[update]
async fn canister_balance() -> Tokens {  
    match ic_ledger_types::account_balance(
        MAINNET_LEDGER_CANISTER_ID,
        AccountBalanceArgs {
            account: AccountIdentifier::new(&ic_cdk::api::id(), &DEFAULT_SUBACCOUNT)
        }
    ).await {
        Ok(t) => t,
        _ => Tokens::from_e8s(0)
    }    
}


#[pre_upgrade]
fn pre_upgrade() {
    let canister_id = id();
    print(format!("starting pre_upgrade {:?}", canister_id));

    CONTEXT.with(|c| {
        let context = c.borrow();
        let id = context.id;
        let users = Vec::from_iter(context.user_service.users
            .iter()
            .map(|(_k, v)| (v.clone())));
        let projects = Vec::from_iter(context.project_service.projects
            .iter()
            .map(|(_k, v)| (v.clone())));

        let transactions = Vec::from_iter(context.transaction_service.transactions
            .iter()
            .map(|(_k, v)| (v.clone())));
        let claims = Vec::from_iter(context.claim_service.proposals
            .iter()
            .map(|(_k, v)| (v.clone())));

        let payload: DaoDataStorage = DaoDataStorage {
            id, users, projects, transactions, claims
        };
        
        storage::stable_save((payload,))
            .expect("failed to save state data");
        
        print(format!("started pre_upgrade {:?}", canister_id));
    });
    
}

#[post_upgrade]
fn post_upgrade() {
    let canister_id = id();
    print(format!("starting post_upgrade {:?}", canister_id));

    let (payload, ): (DaoDataStorage, ) = storage::stable_restore().expect("failed to restore users");

    let state_stable = DaoContext::from(payload);
    
    CONTEXT.with(|s| {
        let mut state = s.borrow_mut();
        *state = state_stable;
    });

    print(format!("started post_upgrade {:?}", canister_id));

}

ic_cdk::export::candid::export_service!();

#[query(name = "__get_candid_interface_tmp_hack")]
fn export_candid() -> String {
    __export_service()
}
