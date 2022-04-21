
use ic_cdk_macros::{query, update};
use ic_cdk::{caller, api::time};
use candid::Principal;

use super::{
    domain::*,
    response::{
        RegisterResult,
    },
};

use crate::CONTEXT;

#[update] 
fn register_user(cmd: UserRegisterCommand) -> RegisterResult {
    CONTEXT.with(|c| 
        match c.borrow_mut().register_user(cmd) {
            Some(p) => RegisterResult::Registered { owner: p },
            None => RegisterResult::UserAlreadyExists,
        }
    )
}

#[query]
fn get_user(principal: String) -> Option<UserProfile> {
    Principal::from_text(principal).ok().and_then(|p| 
        CONTEXT.with(|c| c.borrow().get_user(p))
    )
    
    // match Principal::from_text(principal) {
    //     Ok(principal) => CONTEXT.with(|s| s.borrow().get_user(principal)),
    //     Err(_) => None,
    // }
}

#[query]
fn get_self() -> Option<UserProfile> {
    CONTEXT.with(|c| {
        let context = c.borrow();
        context.get_user(context.env.caller())      
    })
}