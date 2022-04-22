
use std::collections::BTreeMap;

use candid::Principal;

use super::domain::{UserProfile, UserRegisterCommand, UserStatus, Timestamp};

#[derive(Debug, Default)]
pub struct UserService {
    pub users: BTreeMap<Principal, UserProfile>,
}

impl UserService {
    pub fn register_user(&mut self, cmd: UserRegisterCommand, id: u64, caller: Principal, now: Timestamp) -> Option<Principal> {
        match self.users.get(&caller) {
            Some(_) => None,
            None => {
                self.users.insert(
                    caller,
                    cmd.build_profile(
                        id,
                        caller,
                        UserStatus::Enable,
                        now
                    )
                );                
                Some(caller)
            }
        }       
    }

    // pub fn get_self(&self) -> Option<UserProfile> {
    //    self.users.get(&self.env.caller()).cloned()
    // }

    pub fn get_user(&self, principal: Principal) -> Option<UserProfile> {
        self.users.get(&principal).cloned()    
    }
}