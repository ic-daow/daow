
use ic_cdk_macros::{query, update};
use candid::Principal;

use super::{
    domain::*,
    error::UserError,
};

use crate::CONTEXT;
use crate::common::guard::user_owner_guard;


#[update] 
fn register_user(cmd: UserRegisterCommand) -> Result<String, UserError> {
    CONTEXT.with(|c| {
        let mut ctx = c.borrow_mut();
        let id = ctx.id;
        let caller = ctx.env.caller();
        let now = ctx.env.now();
        match ctx.user_service.register_user(cmd, id, caller, now) {
            Some(p) => {
                ctx.id += 1;    // 注册成功，id + 1
                Ok(p.to_string())
            },
            None => Err(UserError::UserAlreadyExists),
        }
    })
}

#[update(guard = "user_owner_guard")]
fn edit_user(cmd: UserEditCommand) -> Result<bool, UserError> {
    CONTEXT.with(|c| {
        let mut ctx = c.borrow_mut();
        let principal = ctx.env.caller();
        ctx.user_service.edit_user(cmd, principal).ok_or(UserError::UserNotFound)
    })
}

#[update]
fn enable_user(principal: Principal) -> Result<bool, UserError> {
    CONTEXT.with(|c| {
        c.borrow_mut().user_service.enable_user(principal).ok_or(UserError::UserNotFound)
    })
}

#[update]
fn disable_user(principal: Principal) -> Result<bool, UserError> {
    CONTEXT.with(|c| {
        c.borrow_mut().user_service.disable_user(principal).ok_or(UserError::UserNotFound)
    })
}

#[query]
fn get_user(principal: String) -> Result<UserProfile, UserError> {
    Principal::from_text(principal).ok().and_then(|p| 
        CONTEXT.with(|c| c.borrow().user_service.get_user(p))
    ).ok_or(UserError::UserNotFound)
}

#[query]
fn get_self() -> Result<UserProfile, UserError> {
    CONTEXT.with(|c| {
        let context = c.borrow();
        let caller = context.env.caller();
        context.user_service.get_user(caller).ok_or(UserError::UserNotFound)  
    })
}