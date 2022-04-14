
use std::{cell::{Cell, RefCell}, collections::BTreeMap};
use std::iter::FromIterator;

use candid::{CandidType, Deserialize};
use ic_cdk::{caller, api::time, id, print};
use ic_cdk_macros::*;
use ic_cdk::storage;

use crate::{
    user::{
        domain::{UserRegisterCommand, UserStatus, UserProfile},
        response::RegisterResponse,
    }, 
};

pub type UserCache = BTreeMap<String, UserProfile>;
// thread_local! {
//     static mut STATE: RefCell<State> = RefCell::new(State::new());
// };

// #[derive(Debug, Clone, CandidType, Deserialize, Default)]
// struct State {
//     users: RefCell<UserCache>
    
// }

// impl Default for State {
//     fn default() -> Self {
//         const FIRST_USER_ID: UserId = 10_000;
//         Self {
//             users: RefCell::new(
//                 Storage::new((
//                 FIRST_USER_ID,
//                 FIRST_USER_ID.saturating_add(DEFAULT_RANGE_SIZE),
//             ))),
//         }
//     }
// }

thread_local! {
    static USERS : RefCell<UserCache> = RefCell::new(UserCache::new());
    // static STATE: State = State::default();
    static ID : Cell<u64> = Cell::new(10001);
}

#[update] 
fn register_user(cmd: UserRegisterCommand) -> RegisterResponse {
    let _caller = caller().to_string();
    USERS.with(|u| {
        let mut store = u.borrow_mut();
        match store.get(&_caller) {
            Some(_) => RegisterResponse::UserAlreadyExists { id: _caller },
            None => {
                let id = ID.with(|id| {
                    let id = id.get();
                    id.saturating_add(1)
                });
                let status = UserStatus::Enable;
                let created_at = time();
                let profile = cmd.to_profile(id, _caller.clone(), status, created_at);
                store.insert(_caller.clone(), profile);
                ID.with(|id| id.set(id.get() + 1));
                RegisterResponse::Registered { id: _caller }
            }
        }
        // let id = ID.with(|id| {
        //     let id = id.get();
        //     id.saturating_add(1)
        // });

        // TODO check principal exists

        // match store.allocate_user_number() {
        //     Some(id) => {
        //         store
        //             .write(id, vec![cmd.to_profile(id, caller().to_string(), UserStatus::Enable, time())])
        //             .unwrap_or_else(|e| {
        //                 trap(&format!("failed to store user: {}", e))
        //             });

        //         // store.flush();

        //         RegisterResponse::Registered { id: id.to_string() }
        //     }
        //     None => RegisterResponse::InternalError
        // }
    })

}

#[query]
fn get_user(principal: String) -> Option<UserProfile> {
    USERS.with(|s| {
        s.borrow().get(&principal).cloned()
        // match res {
        //     Ok(users) => users.first().cloned(),
        //     Err(_) => None,
        // }           
    })

}

#[query]
fn get_self() -> Option<UserProfile> {
    let principal = caller().to_string();
    USERS.with(|s| {
        s.borrow().get(&principal).cloned()        
    })
}

#[query]
fn next_id() -> u64 {
    ID.with(|id| id.get())
}

#[ic_cdk_macros::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

#[query]
fn get_caller() -> String {
    caller().to_string()
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct Payload {
    users: Vec<(String, UserProfile)>,
    id: u64,
}

#[pre_upgrade]
fn pre_upgrade() {
    let canister_id = id();
    print(format!("starting pre_upgrade {:?}", canister_id));
    let vs: Vec<(String, UserProfile)> =  USERS.with(|s| {
        let res = s.borrow();
        Vec::from_iter(res
            .iter()
            .map(|(k, v)| (k.clone(), v.clone())))
    });

    let id = ID.with(|id| id.get());
    let payload = Payload {
        users: vs,
        id,
    };
    storage::stable_save((payload,))
        .expect("failed to save users");
    
        print(format!("started pre_upgrade {:?}", canister_id));
}

#[post_upgrade]
fn post_upgrade() {
    let (payload, ): (Payload, ) = storage::stable_restore().expect("failed to restore users");
    
    ID.with(|id| id.set(payload.id));
    
    USERS.with(|s| {
        let mut store = s.borrow_mut();
        for (k, v) in payload.users {
            store.insert(k, v);
        }
    });

    

}