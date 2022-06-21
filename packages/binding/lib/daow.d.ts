import { BaseActor, ICreateActorOptions } from './actor';
import { _SERVICE } from './actor/daow.did';
import { ICPrincipal } from './utils';
/**
 *******************************************************************************
 ********************************** Project ************************************
 *******************************************************************************
 */
export interface IProject {
    id: number;
    name: string;
    description: string;
    status: ProjectStatus;
    owner: string;
    progress: ProgressStages;
    wallet_addr: string;
    owner_info: string;
    logo_id: number;
    logo: number[];
    memo: string;
    tags: string[];
    links: string[];
    contact_info: string[];
    roadmap_id: number;
    roadmap: number[];
    actual_raised: number;
    tokenomics: ITokenomics;
    team: ITeam;
    trust_by: ITrustBy;
    capital_detail: ICapitalDetail;
    claimed: number;
    latest_claim_at?: bigint;
    created_at: bigint;
    updated_at: bigint;
}
export interface IProjectResult {
    success: boolean;
}
export interface IDistribution {
    marketing: string;
    team: string;
}
export interface ITeam {
    name: string;
    position: string;
    picture_id: number;
    picture: number[];
    twitter?: string;
}
export interface ITokenomics {
    symbol: string;
    token: string;
    total_supply: number;
    distribution: IDistribution[];
    did: string;
}
export interface IRaise {
    currency: string;
    amount: number;
}
export interface ICapitalDetail {
    release: IReleaseRule;
    raise: IRaise;
    price_per_icp: number;
}
export interface ITrustBy {
    name: string;
    link: string;
    logo_id: number;
    logo: number[];
}
export interface IReleaseRule {
    start_date: bigint;
    amount_per_day: number;
    method: ReleaseMethods;
}
export declare enum ReleaseMethods {
    Linear = "Linear"
}
export declare enum ProgressStages {
    UnOpen = "Unopen",
    InProgress = "InProgress",
    ToClaim = "ToClaim",
    Claimed = "Claimed",
    Completed = "Completed"
}
export declare enum ProjectStatus {
    Enable = "Enable",
    Disable = "Disable",
    Pending = "Pending"
}
export declare enum ProjectErrors {
    NotFound = "NotFound",
    AlreadyExists = "AlreadyExists",
    AlreadyCompleted = "AlreadyCompleted",
    UserNotFound = "UserNotFound",
    ProjectReleaseTimeTooEarly = "ProjectReleaseTimeTooEarly"
}
/**
 * create project
 */
export interface ICreateProjectArg {
    name: string;
}
export interface ICreateProjectResult {
    id: number;
}
/**
 * modify project
 */
export interface IModifyProjectArg {
    id: number;
    name: string;
    description: string;
    owner: string;
    owner_info: string;
    wallet_addr: string;
    logo_id: number;
    logo: number[];
    roadmap_id: number;
    roadmap: number[];
    tags: string[];
    links: string[];
    contact_info: string[];
    trust_by: ITrustBy;
    tokenomics: ITokenomics;
    team: ITeam;
    capital_detail: ICapitalDetail;
    memo: string;
}
/**
 * get paged project
 */
export interface IGetPagedProjectArg {
    page: number;
    size: number;
    query: string;
}
export interface IPagedProjectResult {
    page: number;
    size: number;
    total: number;
    data: IProject[];
}
/**
 * get list project
 */
export interface IGetListProjectArg {
    status: ProjectStatus;
}
export interface IGetListProjectResult {
    data: IProject[];
}
/**
 * apply project capital
 */
interface IApplyProjectCapitalArg {
    id: number;
    capital_detail: ICapitalDetail;
}
/**
 * apply project description
 */
interface IApplyProjectDescriptionArg {
    id: number;
    description: string;
}
/**
 * apply project roadmap
 */
interface IApplyProjectRoadmapArg {
    id: number;
    roadmap: number[];
}
/**
 * apply project team
 */
interface IApplyProjectTeamArg {
    id: number;
    team: ITeam;
}
/**
 * apply project tokenomics
 */
interface IApplyProjectTokenomicsArg {
    id: number;
    tokenomics: ITokenomics;
}
/**
 * apply project trust by
 */
interface IApplyProjectTrustByArg {
    id: number;
    trust_by: ITrustBy;
}
/**
 *******************************************************************************
 ********************************** Proposal ***********************************
 *******************************************************************************
 */
interface IClaimProposal {
    id: number;
    proposer: string;
    voters: string[];
    state: ProposalStates;
    failed_reason: string | null;
    payload: IProposalPayload;
    votes_yes: IProposalWeight;
    votes_no: IProposalWeight;
    created_at: bigint;
}
interface IProposalWeight {
    amount_e8s: number;
}
interface IProposalPayload {
    recipient_principal: string;
    project_id: number;
    amount_e8s: number;
}
/**
 * create claim proposal
 */
interface ICreateClaimProposalArg {
    recipient_principal: string;
    project_id: number;
    amount_e8s: number;
}
interface ICreateClaimProposalResult {
    id: number;
}
/**
 * get claim proposal
 */
interface IGetClaimProposal {
    id: number;
}
/**
 * get paged claim proposal
 */
interface IGetPagedClaimProposalArg {
    page: number;
    size: number;
    query: string;
}
interface IGetPagedClaimProposalResult {
    page: number;
    size: number;
    total: number;
    data: IClaimProposal[];
}
/**
 * vote claim proposal
 */
interface IVoteClaimProposalArg {
    proposal_id: number;
    vote: Votes;
}
interface IVoteClaimProposalResult {
    state: ProposalStates;
    failed_reason: string | null;
}
export declare enum ProposalStates {
    Open = "Open",
    Executing = "Executing",
    Accepted = "Accepted",
    Succeeded = "Succeeded",
    Rejected = "Rejected",
    Failed = "Failed"
}
declare enum Votes {
    Yes = "Yes",
    No = "No"
}
export declare enum ProposalClaimErrors {
    NotFound = "NotFound",
    AlreadyExists = "AlreadyExists",
    Invalid = "Invalid",
    AlreadyVoted = "AlreadyVoted",
    NotOpen = "NotOpen",
    ClaimAmountExceedUpperLimit = "ClaimAmountExceedUpperLimit"
}
/**
 *******************************************************************************
 ******************************** Transaction **********************************
 *******************************************************************************
 */
interface ITransaction {
    tx_id: number;
    project_id: number;
    from_principal: string;
    from: string;
    to: string;
    amount: number;
    memo: number;
    is_finalize: boolean;
    block_height: number;
    created_at: bigint;
}
/**
 * create transaction
 */
interface ICreateTransactionArg {
    project_id: number;
    from: string;
    to: string;
    amount: number;
    memo: number;
}
interface ICreateTransactionResult {
    id: number;
}
/**
 * modify transaction
 */
interface IModifyTransactionArg {
    project_id: number;
    tx_id: number;
    amount: number;
    block_height: number;
    memo: number;
}
/**
 * get paged transaction
 */
interface IGetPagedTransactionArg {
    page: number;
    size: number;
    query: string;
}
interface IGetPagedTransactionResult {
    page: number;
    size: number;
    total: number;
    data: ITransaction[];
}
/**
 * verify transaction
 */
interface IVerifyTransactionArg {
    project_id: number;
    block_height: number;
}
interface ITransactionResult {
    success: boolean;
}
export declare enum TransactionErrors {
    NotFound = "NotFound",
    AlreadyExists = "AlreadyExists",
    NotFinalized = "NotFinalized",
    BlockHeightNotValid = "BlockHeightNotValid",
    ProjectInvalid = "ProjectInvalid"
}
/**
 *******************************************************************************
 ************************************ User *************************************
 *******************************************************************************
 */
export interface IUser {
    id: number;
    name: string;
    email: string;
    owner: string;
    status: UserStatus;
    avatar_id: number;
    avatar_uri: string;
    biography: string;
    interests: string[];
    memo: string;
    created_at: bigint;
}
export interface IUserResult {
    success: boolean;
}
/**
 * create user
 */
export interface ICreateUserArg {
    name: string;
    email: string;
    memo: string;
}
export interface ICreateUserResult {
    name: string;
}
/**
 * modify user
 */
export interface IModifyUserArg {
    name: string;
    email: string;
    avatar_uri: string;
    avatar_id: bigint;
    biography: string;
    interests: string[];
    status: UserStatus;
    memo: string;
}
export declare enum UserStatus {
    Enable = "Enable",
    Disable = "Disable"
}
export declare enum UserErrors {
    AlreadyExists = "AlreadyExists",
    AlreadyCompleted = "AlreadyCompleted",
    NotFound = "NotFound"
}
/**
 *******************************************************************************
 *********************************** Others ************************************
 *******************************************************************************
 */
interface IBalance {
    e8s: number;
}
/**
 *******************************************************************************
 ********************************** Canister ***********************************
 *******************************************************************************
 */
export declare class DaowActor extends BaseActor<_SERVICE> {
    /**
     * 创建actor
     */
    create(cid: string, options?: ICreateActorOptions): Promise<DaowActor>;
    /**
     ********************************* Project ***********************************
     */
    /**
     * create project
     */
    createProject(arg: ICreateProjectArg): Promise<ICreateProjectResult>;
    /**
     * delete project
     */
    deleteProject(projectId: number): Promise<IProjectResult>;
    /**
     * modify project
     */
    modifyProject(project: IModifyProjectArg): Promise<IProjectResult>;
    /**
     * submit project
     */
    submitProject(id: number): Promise<IProjectResult>;
    /**
     * get project
     */
    getProject(projectId: number): Promise<IProject>;
    /**
     * get paged project
     */
    getPagedProject(arg: IGetPagedProjectArg): Promise<IPagedProjectResult>;
    /**
     * get list project
     */
    getListProject(arg: IGetListProjectArg): Promise<IGetListProjectResult>;
    /**
     * get my project
     */
    getMyProject(): Promise<IGetListProjectResult>;
    /**
     * get my invest project
     */
    getMyInvestProject(): Promise<IGetListProjectResult>;
    /**
     * apply project capital
     */
    applyProjectCapital(arg: IApplyProjectCapitalArg): Promise<IProjectResult>;
    /**
     * apply project description
     */
    applyProjectDescription(arg: IApplyProjectDescriptionArg): Promise<IProjectResult>;
    /**
     * apply project roadmap
     */
    applyProjectRoadmap(arg: IApplyProjectRoadmapArg): Promise<IProjectResult>;
    /**
     * apply project team
     */
    applyProjectTeam(arg: IApplyProjectTeamArg): Promise<IProjectResult>;
    /**
     * apply project tokenomics
     */
    applyProjectTokenomics(arg: IApplyProjectTokenomicsArg): Promise<IProjectResult>;
    /**
     * apply project trust by
     */
    applyProjectTrustBy(arg: IApplyProjectTrustByArg): Promise<IProjectResult>;
    /**
     ****************************** Claim Proposal *******************************
     */
    /**
     * create claim proposal
     */
    createClaimProposal(arg: ICreateClaimProposalArg): Promise<ICreateClaimProposalResult>;
    /**
     * vote claim proposal
     */
    voteClaimProposal(arg: IVoteClaimProposalArg): Promise<IVoteClaimProposalResult>;
    /**
     * get claim proposal
     */
    getClaimProposal(arg: IGetClaimProposal): Promise<IClaimProposal>;
    /**
     * get paged claim proposal
     */
    getPagedClaimProposal(arg: IGetPagedClaimProposalArg): Promise<IGetPagedClaimProposalResult>;
    /**
     ******************************** Transaction ********************************
     */
    /**
     * create transaction
     */
    createTransaction(arg: ICreateTransactionArg): Promise<ICreateTransactionResult>;
    /**
     * modify transaction
     */
    modifyTransaction(arg: IModifyTransactionArg): Promise<ITransactionResult>;
    /**
     * verify transaction
     */
    verifyTransaction(arg: IVerifyTransactionArg): Promise<ITransactionResult>;
    /**
     * get transaction
     */
    getTransaction(id: number): Promise<ITransaction>;
    /**
     * get paged transactions
     */
    getPagedTransaction(arg: IGetPagedTransactionArg): Promise<IGetPagedTransactionResult>;
    /**
     ********************************** User *************************************
     */
    /**
     * create user
     */
    createUser(arg: ICreateUserArg): Promise<ICreateUserResult>;
    /**
     * modify user
     */
    modifyUser(arg: IModifyUserArg): Promise<IUserResult>;
    /**
     * enable user
     */
    enableUser(userId: string | ICPrincipal): Promise<IUserResult>;
    /**
     * disable user
     */
    disableUser(userId: string | ICPrincipal): Promise<IUserResult>;
    /**
     * get user
     */
    getUser(principal: string | ICPrincipal): Promise<IUserResult>;
    /**
     * get self
     */
    getSelf(): Promise<IUser>;
    /**
     ********************************* Others ************************************
     */
    /**
     * get balance
     */
    getBalance(): Promise<IBalance>;
    /**
     * greet
     */
    greet(input: string): Promise<string>;
    /**
     ***************************** Private Methods *******************************
     */
    private toCreateProjectCommand;
    private fromProjectCreatedResult;
    private toPageQuery;
    private toProjectListQuery;
    private toProjectEditCommand;
    private fromProjectProfile;
    private fromTrustBy;
    private toTrustBy;
    private fromTeam;
    private toTeam;
    private fromTokenomics;
    private toTokenomics;
    private fromCapitalDetail;
    private toCapitalDetail;
    private fromProjectPageResult;
    private toProjectIdCommand;
    private fromProjectResult;
    private fromBoolProjectResult;
    private fromTransactionProfile;
    private toUserRegisterCommand;
    private fromRegisterUserResult;
    private toUserEditCommand;
    private fromBoolUserResult;
    private fromUserResult;
    private fromClaimProposal;
}
export {};
