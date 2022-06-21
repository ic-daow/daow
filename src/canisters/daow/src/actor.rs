
use std::iter::FromIterator;

use candid::{encode_args, Principal, Nat, CandidType, Deserialize};
use ic_cdk::{caller, id, print};
use ic_cdk_macros::*;
use ic_cdk::storage;
use ic_ledger_types::{MAINNET_LEDGER_CANISTER_ID, AccountBalanceArgs, AccountIdentifier, DEFAULT_SUBACCOUNT, Tokens};
use log::{debug, error, info};
use serde::Serialize;

use crate::common::constant::CYCLES_PER_DFT_CANISTER;
use crate::context::{DaoContext, DaoDataStorage};

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

// #[derive(Debug, Clone, CandidType, Deserialize)]
// pub struct DFTDeployArgs {
//     sub_account: Option<Subaccount>,
//     logo: Option<Vec<u8>>,
//     name: String,
//     symbol: String,
//     decimals: u8,
//     total_supply: Nat,
//     fee: TokenFee,
//     caller: Option<Principal>,
//     archive_option: Option<ArchiveOptions>,
// }

// pub type Subaccount = [u8; 32];

// #[derive(CandidType, Default, Debug, Hash, Clone, Deserialize, PartialEq, Eq, PartialOrd, Ord)]
// pub struct TokenFee {
//     pub minimum: Nat,
//     pub rate: u32,
//     #[serde(rename = "rateDecimals")]
//     pub rate_decimals: u8,
// }


// #[derive(Serialize, Deserialize, CandidType, Clone, Debug, PartialEq, Eq)]
// pub struct ArchiveOptions {
//     /// The number of blocks which, when exceeded, will trigger an archiving
//     /// operation
//     pub trigger_threshold: u32,
//     /// The number of blocks to archive when trigger threshold is exceeded
//     pub num_blocks_to_archive: u32,
//     pub node_max_memory_size_bytes: Option<u32>,
//     pub max_message_size_bytes: Option<u32>,
//     pub cycles_for_archive_creation: Option<u64>,
// }

// /// 为 dft canister 创建canister id
// /// 然后把 dft wasm 部署到 刚创建的 canister id
// // #[update] 
// async fn create_and_install_dft(args: DFTDeployArgs) -> Result<Principal, String> {

//     // create dft canister id 
//     // project_id, token args,
//     let controller = ic_cdk::api::caller();
//     let dft_canister_id = create_new_dft_canister(controller).await?;  

//     // install dft wasm code 
//     // need args: sub_account: Option<Subaccount, logo: Option<Vec<u8>>, name: String, decimals: u8, total_supply: Nat, 
//     // fee: TokenFee, caller: Option<Principal>, archive_option: Option<ArchiveOptions>
//     let _ = install_dft_canister_code(&dft_canister_id, args).await?;
    
//     Ok(dft_canister_id)
// }

// async fn create_new_dft_canister(
//     controller: Principal,
// ) -> Result<Principal, String> {
//     let daow_canister = ic_cdk::api::id();
//     let create_args = CreateCanisterArgs {
//         cycles: CYCLES_PER_DFT_CANISTER,
//         settings: CanisterSettings {
//             controllers: Some(vec![controller, daow_canister]),
//             compute_allocation: None,
//             memory_allocation: None,
//             freezing_threshold: None,
//         },
//     };
//     debug!("creating dft token ...");
//     let ic_management: Box<dyn IICManagementAPI> = Box::new(ICManagementAPI::default());
//     let create_result = ic_management.create_canister(create_args).await;

//     match create_result {
//         Ok(cdr) => {         
//             // let _ = install_dft_canister_code().await?;
//             Ok(cdr.canister_id)
//         }
//         Err(msg) => {
//             let msg = format!("create new dft canister failed {}", msg);
//             error!("{}", msg);
//             Err(msg)
//         }
//     }
    
// }

// async fn install_dft_canister_code(
//     canister_id: &Principal,
//     args: DFTDeployArgs
// ) -> Result<(), String> {
//     let ic_management: Box<dyn IICManagementAPI> = Box::new(ICManagementAPI::default());
//     match encode_args((args.sub_account, args.logo, args.name, args.symbol, args.decimals, args.total_supply, args.fee, args.caller, args.archive_option)) {
//         Ok(install_args) => {
//             match ic_management.canister_install(
//                     canister_id,
//                     DFT_STANDARD_WASM.to_vec(),
//                     install_args,
//                 )
//                 .await
//             {
//                 Ok(_) => {
//                     info!("install dft canister success");
//                     Ok(())
//                 }
//                 Err(msg) => {
//                     let msg = format!(
//                         "install dft canister {:?} failed. details:{}",
//                         canister_id,
//                         msg
//                     );
//                     error!("{}", msg);
//                     Err(msg)
//                 }
//             }
//         }
//         Err(msg) => {
//             let msg = format!("encode_args failed. details:{:?}", msg);
//             error!("{}", msg);
//             Err(msg)
//         }
//     }
// }
