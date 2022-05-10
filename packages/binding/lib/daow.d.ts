import { BaseActor, ICreateActorOptions } from './actor';
import { _SERVICE } from './actor/daow.did';
import { ICPrincipal } from './utils';
/**
 * dao
 */
export interface ICreateProjectArg {
    name: string;
}
export interface ICreateProjectResult {
    id: number;
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
export declare enum ReleaseMethods {
    Linear = "Linear"
}
export interface IReleaseRule {
    start_date: number;
    amount_per_day: number;
    method: ReleaseMethods;
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
export interface IPagedProjectArg {
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
export interface IListProjectArg {
    status: ProjectStatus;
}
export interface IListProjectResult {
    data: IProject[];
}
export declare enum ProjectStatus {
    Enable = "Enable",
    Disable = "Disable",
    Pending = "Pending"
}
export declare enum ProgressStages {
    UnOpen = "Unopen",
    InProgress = "InProgress",
    Completed = "Completed"
}
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
    tokenomics: ITokenomics;
    team: ITeam;
    trust_by: ITrustBy;
    capital_detail: ICapitalDetail;
    created_at: number;
    updated_at: number;
}
export interface IProjectResult {
    success: boolean;
}
export declare enum ProjectErrors {
    NotFound = "NotFound",
    AlreadyExists = "AlreadyExists",
    AlreadyCompleted = "AlreadyCompleted",
    UserNotFound = "UserNotFound"
}
/**
 * user
 */
export interface ICreateUserArg {
    name: string;
    email: string;
    memo: string;
}
export interface ICreateUserResult {
    name: string;
}
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
    created_at: number;
}
export interface IUserResult {
    success: boolean;
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
export declare class DaowActor extends BaseActor<_SERVICE> {
    /**
     * 创建actor
     */
    create(cid: string, options?: ICreateActorOptions): Promise<DaowActor>;
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
     * get project
     */
    getProject(projectId: number): Promise<IProject>;
    /**
     * get paged project
     */
    getPagedProject(arg: IPagedProjectArg): Promise<IPagedProjectResult>;
    /**
     * get list project
     */
    getListProject(arg: IListProjectArg): Promise<IListProjectResult>;
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
     * greet
     */
    greet(input: string): Promise<string>;
    private toCreateProjectCommand;
    private fromProjectCreatedResult;
    private toProjectEditCommand;
    private toProjectPageQuery;
    private toProjectListQuery;
    private fromProjectProfile;
    private fromProjectPageResult;
    private toProjectIdCommand;
    private fromProjectResult;
    private fromBoolProjectResult;
    private toUserRegisterCommand;
    private fromRegisterUserResult;
    private toUserEditCommand;
    private fromBoolUserResult;
    private fromUserResult;
}
