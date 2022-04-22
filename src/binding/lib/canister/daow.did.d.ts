import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface ProjectCreateCommand {
  'title' : string,
  'logo' : Array<number>,
  'memo' : [] | [string],
  'tags' : Array<string>,
  'links' : Array<string>,
  'information' : string,
  'contact_info' : Array<string>,
  'wallet_addr' : string,
  'owner_info' : string,
}
export type ProjectCreatedError = { 'ProjectAlreadyExists' : null } |
  { 'UserNotFound' : null };
export type ProjectCreatedResult = { 'Ok' : bigint } |
  { 'Err' : ProjectCreatedError };
export type RegisterResult = { 'user_already_exists' : null } |
  { 'internal_error' : null } |
  { 'user_already_disabled' : { 'owner' : Principal } } |
  { 'registered' : { 'owner' : Principal } };
export interface UserProfile {
  'id' : bigint,
  'status' : UserStatus,
  'owner' : Principal,
  'memo' : [] | [string],
  'name' : string,
  'created_at' : bigint,
  'email' : string,
}
export interface UserRegisterCommand {
  'memo' : [] | [string],
  'name' : string,
  'email' : string,
}
export type UserStatus = { 'Enable' : null } |
  { 'Disable' : null };
export interface _SERVICE {
  'create_project' : ActorMethod<[ProjectCreateCommand], ProjectCreatedResult>,
  'get_self' : ActorMethod<[], [] | [UserProfile]>,
  'get_user' : ActorMethod<[string], [] | [UserProfile]>,
  'greet' : ActorMethod<[string], string>,
  'register_user' : ActorMethod<[UserRegisterCommand], RegisterResult>,
}