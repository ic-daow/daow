import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type BoolProjectResult = { 'Ok' : boolean } |
  { 'Err' : ProjectError };
export type BoolTransactionResult = { 'Ok' : boolean } |
  { 'Err' : TransactionError };
export type BoolUserResult = { 'Ok' : boolean } |
  { 'Err' : UserError };
export interface CapitalDetail {
  'release' : ReleaseRule,
  'raise' : Raise,
  'price_per_icp' : bigint,
}
export interface Distribution { 'marketing' : string, 'team' : string }
export type ProgressStage = { 'Unopen' : null } |
  { 'InProgress' : null } |
  { 'Completed' : null };
export interface ProjectApplyCapitalDetailCommand {
  'id' : bigint,
  'capital_detail' : CapitalDetail,
}
export interface ProjectApplyDescriptionCommand {
  'id' : bigint,
  'description' : string,
}
export interface ProjectApplyRoadmapCommand {
  'id' : bigint,
  'roadmap' : Array<number>,
}
export interface ProjectApplyTeamCommand { 'id' : bigint, 'team' : Team }
export interface ProjectApplyTokenomicsCommand {
  'id' : bigint,
  'tokenomics' : Tokenomics,
}
export interface ProjectApplyTrustByCommand {
  'id' : bigint,
  'trust_by' : TrustBy,
}
export interface ProjectCreateCommand { 'name' : string }
export type ProjectCreatedResult = { 'Ok' : bigint } |
  { 'Err' : ProjectError };
export interface ProjectEditCommand {
  'id' : bigint,
  'roadmap' : Array<number>,
  'tokenomics' : Tokenomics,
  'owner' : Principal,
  'logo' : Array<number>,
  'memo' : string,
  'name' : string,
  'tags' : Array<string>,
  'team' : Team,
  'description' : string,
  'capital_detail' : CapitalDetail,
  'links' : Array<string>,
  'logo_id' : bigint,
  'contact_info' : Array<string>,
  'wallet_addr' : string,
  'trust_by' : TrustBy,
  'roadmap_id' : bigint,
  'owner_info' : string,
}
export type ProjectError = { 'ProjectAlreadyExists' : null } |
  { 'ProjectAlreadyCompleted' : null } |
  { 'ProjectNotFound' : null } |
  { 'UserNotFound' : null };
export interface ProjectIdCommand { 'id' : bigint }
export interface ProjectListQuery { 'status' : string }
export type ProjectListResult = { 'Ok' : ProjectProfiles } |
  { 'Err' : ProjectError };
export interface ProjectPage {
  'page_size' : bigint,
  'data' : Array<ProjectProfile>,
  'page_num' : bigint,
  'total_count' : bigint,
}
export interface ProjectPageQuery {
  'page_size' : bigint,
  'querystring' : string,
  'page_num' : bigint,
}
export type ProjectPageResult = { 'Ok' : ProjectPage } |
  { 'Err' : ProjectError };
export interface ProjectProfile {
  'id' : bigint,
  'roadmap' : Array<number>,
  'status' : ProjectStatus,
  'updated_at' : bigint,
  'tokenomics' : Tokenomics,
  'owner' : Principal,
  'logo' : Array<number>,
  'memo' : string,
  'name' : string,
  'tags' : Array<string>,
  'team' : Team,
  'description' : string,
  'capital_detail' : CapitalDetail,
  'created_at' : bigint,
  'links' : Array<string>,
  'logo_id' : bigint,
  'progress' : ProgressStage,
  'contact_info' : Array<string>,
  'wallet_addr' : string,
  'trust_by' : TrustBy,
  'roadmap_id' : bigint,
  'owner_info' : string,
}
export type ProjectProfiles = Array<ProjectProfile>;
export type ProjectResult = { 'Ok' : ProjectProfile } |
  { 'Err' : ProjectError };
export type ProjectStatus = { 'Enable' : null } |
  { 'Disable' : null } |
  { 'Pending' : null };
export interface Raise { 'currency' : string, 'amount' : bigint }
export type RegisterUserResult = { 'Ok' : string } |
  { 'Err' : UserError };
export type ReleaseMethod = { 'Linear' : null };
export interface ReleaseRule {
  'method' : ReleaseMethod,
  'start_date' : bigint,
  'amount_per_day' : bigint,
}
export interface Team {
  'twitter' : [] | [string],
  'name' : string,
  'picture_id' : bigint,
  'picture' : Array<number>,
  'position' : string,
}
export interface Tokenomics {
  'did' : string,
  'token' : string,
  'distribution' : Array<Distribution>,
  'total_supply' : bigint,
  'symbol' : string,
}
export interface TransactionCreateCommand {
  'to' : string,
  'from' : string,
  'memo' : string,
  'amount' : bigint,
}
export type TransactionCreatedResult = { 'Ok' : bigint } |
  { 'Err' : TransactionError };
export type TransactionError = { 'TransactionAlreadyExists' : null } |
  { 'TransactionNotFound' : null };
export interface TransactionIdCommand { 'id' : bigint }
export interface TransactionPage {
  'page_size' : bigint,
  'data' : Array<TransactionProfile>,
  'page_num' : bigint,
  'total_count' : bigint,
}
export interface TransactionPageQuery {
  'page_size' : bigint,
  'querystring' : string,
  'page_num' : bigint,
}
export type TransactionPageResult = { 'Ok' : TransactionPage } |
  { 'Err' : TransactionError };
export interface TransactionProfile {
  'id' : bigint,
  'to' : string,
  'from' : string,
  'memo' : string,
  'created_at' : bigint,
  'from_princiapl' : Principal,
  'is_finalize' : boolean,
  'amount' : bigint,
  'block_height' : bigint,
}
export type TransactionResult = { 'Ok' : TransactionProfile } |
  { 'Err' : TransactionError };
export interface TransactionUpdateCommand {
  'transaction_id' : bigint,
  'memo' : string,
  'amount' : bigint,
  'block_height' : bigint,
}
export interface TrustBy {
  'link' : string,
  'logo' : Array<number>,
  'name' : string,
  'logo_id' : bigint,
}
export interface UserEditCommand {
  'status' : UserStatus,
  'interests' : Array<string>,
  'avatar_uri' : string,
  'memo' : string,
  'name' : string,
  'biography' : string,
  'email' : string,
  'avatar_id' : bigint,
}
export type UserError = { 'UserAlreadyExists' : null } |
  { 'UserAlreadyDisable' : null } |
  { 'UserNotFound' : null };
export interface UserProfile {
  'id' : bigint,
  'status' : UserStatus,
  'owner' : Principal,
  'interests' : Array<string>,
  'avatar_uri' : string,
  'memo' : string,
  'name' : string,
  'biography' : string,
  'created_at' : bigint,
  'email' : string,
  'avatar_id' : bigint,
}
export interface UserRegisterCommand {
  'memo' : string,
  'name' : string,
  'email' : string,
}
export type UserResult = { 'Ok' : UserProfile } |
  { 'Err' : UserError };
export type UserStatus = { 'Enable' : null } |
  { 'Disable' : null };
export interface _SERVICE {
  'apply_project_capital_detail' : ActorMethod<
    [ProjectApplyCapitalDetailCommand],
    BoolProjectResult,
  >,
  'apply_project_description' : ActorMethod<
    [ProjectApplyDescriptionCommand],
    BoolProjectResult,
  >,
  'apply_project_roadmap' : ActorMethod<
    [ProjectApplyRoadmapCommand],
    BoolProjectResult,
  >,
  'apply_project_team' : ActorMethod<
    [ProjectApplyTeamCommand],
    BoolProjectResult,
  >,
  'apply_project_tokenomics' : ActorMethod<
    [ProjectApplyTokenomicsCommand],
    BoolProjectResult,
  >,
  'apply_project_trust_by' : ActorMethod<
    [ProjectApplyTrustByCommand],
    BoolProjectResult,
  >,
  'create_project' : ActorMethod<[ProjectCreateCommand], ProjectCreatedResult>,
  'create_transaction' : ActorMethod<
    [TransactionCreateCommand],
    TransactionCreatedResult,
  >,
  'delete_projet' : ActorMethod<[ProjectIdCommand], BoolProjectResult>,
  'disable_user' : ActorMethod<[Principal], BoolUserResult>,
  'edit_project' : ActorMethod<[ProjectEditCommand], BoolProjectResult>,
  'edit_user' : ActorMethod<[UserEditCommand], BoolUserResult>,
  'enable_user' : ActorMethod<[Principal], BoolUserResult>,
  'get_project' : ActorMethod<[ProjectIdCommand], ProjectResult>,
  'get_self' : ActorMethod<[], UserResult>,
  'get_transaction' : ActorMethod<[TransactionIdCommand], TransactionResult>,
  'get_user' : ActorMethod<[string], BoolUserResult>,
  'greet' : ActorMethod<[string], string>,
  'list_projects' : ActorMethod<[ProjectListQuery], ProjectListResult>,
  'page_project' : ActorMethod<[ProjectPageQuery], ProjectPageResult>,
  'page_transaction' : ActorMethod<
    [TransactionPageQuery],
    TransactionPageResult,
  >,
  'register_user' : ActorMethod<[UserRegisterCommand], RegisterUserResult>,
  'submit_projet' : ActorMethod<[ProjectIdCommand], BoolProjectResult>,
  'update_transaction' : ActorMethod<
    [TransactionUpdateCommand],
    BoolTransactionResult,
  >,
}
import type { IDL } from '@dfinity/candid';
export const idlFactory: IDL;