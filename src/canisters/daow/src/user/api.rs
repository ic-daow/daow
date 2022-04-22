
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
    CONTEXT.with(|c| {
        let mut ctx = c.borrow_mut();
        let id = ctx.id;
        let caller = ctx.env.caller();
        let now = ctx.env.now();
        match ctx.user_service.register_user(cmd, id, caller, now) {
            Some(p) => {
                ctx.id += 1;    // 注册成功，id + 1
                RegisterResult::Registered { owner: p }
            },
            None => RegisterResult::UserAlreadyExists,
        }
    })
}

#[query]
fn get_user(principal: String) -> Option<UserProfile> {
    Principal::from_text(principal).ok().and_then(|p| 
        CONTEXT.with(|c| c.borrow().user_service.get_user(p))
    )
}

#[query]
fn get_self() -> Option<UserProfile> {
    CONTEXT.with(|c| {
        let context = c.borrow();
        context.user_service.get_user(context.env.caller())      
    })
}