
use std::cell::RefCell;

use candid::{CandidType, Deserialize};
use ic_cdk::{caller, api::time, trap};
use ic_cdk_macros::*;
use serde::Serialize;

use crate::{
    user::{
        domain::{UserRegisterCommand, UserStatus, UserProfile},
        error::UserError,
        response::RegisterResponse,
    }, 
    storage::{DEFAULT_RANGE_SIZE, Storage},
};

pub type UserId = u64;

// thread_local! {
//     static mut STATE: RefCell<State> = RefCell::new(State::new());
// };
struct State {
    users: RefCell<Storage<Vec<UserProfile>>>,
    
}

impl Default for State {
    fn default() -> Self {
        const FIRST_USER_ID: UserId = 10_000;
        Self {
            users: RefCell::new(
                Storage::new((
                FIRST_USER_ID,
                FIRST_USER_ID.saturating_add(DEFAULT_RANGE_SIZE),
            ))),
        }
    }
}

thread_local! {
    static STATE: State = State::default();
    // static ASSETS: RefCell<HashMap<&'static str, (Vec<HeaderField>, &'static [u8])>> = RefCell::new(HashMap::default());
}

#[update] 
fn register_user(cmd: UserRegisterCommand) -> RegisterResponse {
    STATE.with(|s| {
        let mut store = s.users.borrow_mut();
        // TODO check principal exists
        
        match store.allocate_user_number() {
            Some(id) => {
                store
                    .write(id, vec![cmd.to_profile(id, caller().to_string(), UserStatus::Enable, time())])
                    .unwrap_or_else(|e| {
                        trap(&format!("failed to store user: {}", e))
                    });

                // store.flush();

                RegisterResponse::Registered { id: id.to_string() }
            }
            None => RegisterResponse::InternalError
        }
    })

}

#[query]
fn get_user(user_id: UserId) -> Option<UserProfile> {
    STATE.with(|s| {
        let res = s
            .users
            .borrow().read(user_id);

        match res {
            Ok(users) => users.first().cloned(),
            Err(_) => None,
        }
           
    })
}

#[ic_cdk_macros::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

#[query]
fn get_caller() -> String {
    caller().to_string()
}
