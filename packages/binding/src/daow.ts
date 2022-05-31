import { BaseActor, ICreateActorOptions } from './actor'
import {
  _SERVICE,
  BoolProjectResult,
  BoolUserResult,
  CapitalDetail,
  idlFactory,
  ProgressStage,
  ProjectCreateCommand,
  ProjectCreatedResult,
  ProjectEditCommand,
  ProjectError,
  ProjectIdCommand,
  ProjectListQuery,
  ProjectPage,
  ProjectPageQuery,
  ProjectPageResult,
  ProjectProfile,
  ProjectProfiles,
  ProjectResult,
  ProjectStatus as _ProjectStatus,
  RegisterUserResult,
  ReleaseMethod,
  Team,
  Tokenomics,
  TransactionError,
  TransactionPage,
  TransactionProfile,
  TrustBy,
  UserEditCommand,
  UserError,
  UserProfile,
  UserRegisterCommand,
  UserResult,
  UserStatus as _UserStatus,
} from './actor/daow.did'
import {
  castPrincipalToString,
  castToPrincipal,
  fromOption,
  fromResult,
  ICPrincipal,
  toOption,
} from './utils'

/**
 * dao
 */
export interface ICreateProjectArg {
  name: string
}

export interface ICreateProjectResult {
  id: number
}

export interface IDistribution {
  marketing: string
  team: string
}

export interface ITeam {
  name: string
  position: string
  picture_id: number
  picture: number[]
  twitter?: string
}

export interface ITokenomics {
  symbol: string
  token: string
  total_supply: number
  distribution: IDistribution[]
  did: string
}

export enum ReleaseMethods {
  Linear = 'Linear',
}

function fromReleaseMethod(method: ReleaseMethod): ReleaseMethods {
  if ('Linear' in method) {
    return ReleaseMethods.Linear
  } else {
    throw new Error('unimplemented')
  }
}

function toReleaseMethod(method: ReleaseMethods): ReleaseMethod {
  switch (method) {
    case ReleaseMethods.Linear:
      return { Linear: null }
    default:
      throw new Error('unimplemented')
  }
}

export interface IReleaseRule {
  start_date: number
  amount_per_day: number
  method: ReleaseMethods
}

export interface IRaise {
  currency: string
  amount: number
}

export interface ICapitalDetail {
  release: IReleaseRule
  raise: IRaise
  price_per_icp: number
}

export interface ITrustBy {
  name: string
  link: string
  logo_id: number
  logo: number[]
}

export interface IModifyProjectArg {
  id: number
  name: string
  description: string
  owner: string
  owner_info: string
  wallet_addr: string
  logo_id: number
  logo: number[]
  roadmap_id: number
  roadmap: number[]
  tags: string[]
  links: string[]
  contact_info: string[]
  trust_by: ITrustBy
  tokenomics: ITokenomics
  team: ITeam
  capital_detail: ICapitalDetail
  memo: string
}

export interface IPagedProjectArg {
  page: number
  size: number
  query: string
}

export interface IPagedProjectResult {
  page: number
  size: number
  total: number
  data: IProject[]
}

export interface IListProjectArg {
  status: ProjectStatus
}

export interface IListProjectResult {
  data: IProject[]
}

export enum ProjectStatus {
  Enable = 'Enable',
  Disable = 'Disable',
  Pending = 'Pending',
}

function fromProjectStatus(status: _ProjectStatus): ProjectStatus {
  if ('Enable' in status) {
    return ProjectStatus.Enable
  } else if ('Disable' in status) {
    return ProjectStatus.Disable
  } else if ('Pending' in status) {
    return ProjectStatus.Pending
  } else {
    throw new Error('unimplemented')
  }
}

export enum ProgressStages {
  UnOpen = 'Unopen',
  InProgress = 'InProgress',
  Completed = 'Completed',
}

function fromProgressStage(stage: ProgressStage): ProgressStages {
  if ('Unopen' in stage) {
    return ProgressStages.UnOpen
  } else if ('InProgress' in stage) {
    return ProgressStages.InProgress
  } else if ('Completed' in stage) {
    return ProgressStages.Completed
  } else {
    throw new Error('unimplemented')
  }
}

export interface IProject {
  id: number
  name: string
  description: string
  status: ProjectStatus
  owner: string
  progress: ProgressStages
  wallet_addr: string
  owner_info: string
  logo_id: number
  logo: number[]
  memo: string
  tags: string[]
  links: string[]
  contact_info: string[]
  roadmap_id: number
  roadmap: number[]
  tokenomics: ITokenomics
  team: ITeam
  trust_by: ITrustBy
  capital_detail: ICapitalDetail
  created_at: number
  updated_at: number
}

export interface IProjectResult {
  success: boolean
}

export enum ProjectErrors {
  NotFound = 'NotFound',
  AlreadyExists = 'AlreadyExists',
  AlreadyCompleted = 'AlreadyCompleted',
  UserNotFound = 'UserNotFound',
}

function fromProjectError(error: ProjectError): ProjectErrors {
  if ('ProjectAlreadyExists' in error) {
    return ProjectErrors.AlreadyExists
  } else if ('ProjectAlreadyCompleted' in error) {
    return ProjectErrors.AlreadyCompleted
  } else if ('UserNotFound' in error) {
    return ProjectErrors.UserNotFound
  } else if ('ProjectNotFound' in error) {
    return ProjectErrors.NotFound
  } else {
    throw new Error('uninmplemented')
  }
}

interface IApplyProjectCapitalDetailArg {
  id: number
  capital_detail: ICapitalDetail
}

interface IApplyProjectDescriptionArg {
  id: number
  description: string
}

interface IApplyProjectRoadmapArg {
  id: number
  roadmap: number[]
}

interface IApplyProjectTeamArg {
  id: number
  team: ITeam
}

interface IApplyProjectTokenomicsArg {
  id: number
  tokenomics: ITokenomics
}

interface IApplyProjectTrustByArg {
  id: number
  trust_by: ITrustBy
}

interface ICreateTransactionArg {
  from: string
  to: string
  amount: number
  memo: string
}

interface ICreateTransactionResult {
  id: number
}

interface ITransaction {
  id: number
  from_princiapl: string
  from: string
  to: string
  amount: number
  memo: string
  is_finalize: boolean
  block_height: number
  created_at: number
}

interface IPagedTransactionArg {
  page: number
  size: number
  query: string
}

interface IPagedTransactionResult {
  page: number
  size: number
  total: number
  data: ITransaction[]
}

interface IModifyTransactionArg {
  id: number
  amount: number
  block_height: number
  memo: string
}

interface ITransactionResult {
  success: boolean
}

export enum TransactionErrors {
  NotFound = 'NotFound',
  AlreadyExists = 'AlreadyExists',
}

function fromTransactionError(error: TransactionError): TransactionErrors {
  if ('TransactionAlreadyExists' in error) {
    return TransactionErrors.AlreadyExists
  } else if ('TransactionNotFound' in error) {
    return TransactionErrors.NotFound
  } else {
    throw new Error('uninmplemented')
  }
}

/**
 * user
 */
export interface ICreateUserArg {
  name: string
  email: string
  memo: string
}

export interface ICreateUserResult {
  name: string
}

export interface IModifyUserArg {
  name: string
  email: string
  avatar_uri: string
  avatar_id: bigint
  biography: string
  interests: string[]
  status: UserStatus
  memo: string
}

export interface IUser {
  id: number
  name: string
  email: string
  owner: string
  status: UserStatus
  avatar_id: number
  avatar_uri: string
  biography: string
  interests: string[]
  memo: string
  created_at: number
}

export interface IUserResult {
  success: boolean
}

export enum UserStatus {
  Enable = 'Enable',
  Disable = 'Disable',
}

function fromUserStatus(status: _UserStatus): UserStatus {
  if ('Enable' in status) {
    return UserStatus.Enable
  } else if ('Disable' in status) {
    return UserStatus.Disable
  } else {
    throw new Error('uninmplemented')
  }
}

function toUserStatus(status: UserStatus): _UserStatus {
  switch (status) {
    case UserStatus.Enable:
      return { Enable: null }
    case UserStatus.Disable:
      return { Disable: null }
    default:
      throw new Error('unimplemented')
  }
}

export enum UserErrors {
  AlreadyExists = 'AlreadyExists',
  AlreadyCompleted = 'AlreadyCompleted',
  NotFound = 'NotFound',
}

function fromUserError(error: UserError): UserErrors {
  if ('UserAlreadyExists' in error) {
    return UserErrors.AlreadyExists
  } else if ('UserAlreadyDisable' in error) {
    return UserErrors.AlreadyCompleted
  } else if ('UserNotFound' in error) {
    return UserErrors.NotFound
  } else {
    throw new Error('uninmplemented')
  }
}

export class DaowActor extends BaseActor<_SERVICE> {
  /**
   * 创建actor
   */
  public async create(cid: string, options?: ICreateActorOptions): Promise<DaowActor> {
    await this._create(cid, idlFactory, options)
    return this
  }

  /**
   * create project
   */
  public async createProject(arg: ICreateProjectArg): Promise<ICreateProjectResult> {
    const result = await this.getActor().create_project(this.toCreateProjectCommand(arg))
    return this.fromProjectCreatedResult(result)
  }

  /**
   * delete project
   */
  public async deleteProject(projectId: number): Promise<IProjectResult> {
    const result = await this.getActor().delete_projet(this.toProjectIdCommand(projectId))
    return this.fromBoolProjectResult(result)
  }

  /**
   * modify project
   */
  public async modifyProject(project: IModifyProjectArg): Promise<IProjectResult> {
    const result = await this.getActor().edit_project(this.toProjectEditCommand(project))
    return this.fromBoolProjectResult(result)
  }

  public async submitProject(id: number): Promise<IProjectResult> {
    const result = await this.getActor().submit_projet({
      id: BigInt(id),
    })
    return this.fromBoolProjectResult(result)
  }

  /**
   * get project
   */
  public async getProject(projectId: number): Promise<IProject> {
    const result = await this.getActor().get_project(this.toProjectIdCommand(projectId))
    return this.fromProjectResult(result)
  }

  /**
   * get paged project
   */
  public async getPagedProject(arg: IPagedProjectArg): Promise<IPagedProjectResult> {
    const result = await this.getActor().page_project(this.toProjectPageQuery(arg))
    return this.fromProjectPageResult(result)
  }

  /**
   * get list project
   */
  public async getListProject(arg: IListProjectArg): Promise<IListProjectResult> {
    const result = await this.getActor().list_projects(this.toProjectListQuery(arg))
    return fromResult<ProjectProfiles, ProjectError, IListProjectResult, ProjectErrors>(
      result,
      (result) => ({ data: result.map((res) => this.fromProjectProfile(res)) }),
      (err) => fromProjectError(err),
    )
  }

  /**
   * apply project capital detail
   */
  public async applyProjectCapitalDetail(
    arg: IApplyProjectCapitalDetailArg,
  ): Promise<IProjectResult> {
    const result = await this.getActor().apply_project_capital_detail({
      id: BigInt(arg.id),
      capital_detail: this.toCapitalDetail(arg.capital_detail),
    })
    return this.fromBoolProjectResult(result)
  }

  /**
   * apply project description
   */
  public async applyProjectDescription(arg: IApplyProjectDescriptionArg): Promise<IProjectResult> {
    const result = await this.getActor().apply_project_description({
      id: BigInt(arg.id),
      description: arg.description,
    })
    return this.fromBoolProjectResult(result)
  }

  /**
   * apply project roadmap
   */
  public async applyProjectRoadmap(arg: IApplyProjectRoadmapArg): Promise<IProjectResult> {
    const result = await this.getActor().apply_project_roadmap({
      id: BigInt(arg.id),
      roadmap: arg.roadmap,
    })
    return this.fromBoolProjectResult(result)
  }

  /**
   * apply project team
   */
  public async applyProjectTeam(arg: IApplyProjectTeamArg): Promise<IProjectResult> {
    const result = await this.getActor().apply_project_team({
      id: BigInt(arg.id),
      team: this.toTeam(arg.team),
    })
    return this.fromBoolProjectResult(result)
  }

  /**
   * apply project tokenomics
   */
  public async applyProjectTokenomics(arg: IApplyProjectTokenomicsArg): Promise<IProjectResult> {
    const result = await this.getActor().apply_project_tokenomics({
      id: BigInt(arg.id),
      tokenomics: this.toTokenomics(arg.tokenomics),
    })
    return this.fromBoolProjectResult(result)
  }

  /**
   * apply project trust by
   */
  public async applyProjectTrustBy(arg: IApplyProjectTrustByArg): Promise<IProjectResult> {
    const result = await this.getActor().apply_project_trust_by({
      id: BigInt(arg.id),
      trust_by: this.toTrustBy(arg.trust_by),
    })
    return this.fromBoolProjectResult(result)
  }

  /**
   * create transaction
   */
  public async createTransaction(arg: ICreateTransactionArg): Promise<ICreateTransactionResult> {
    const result = await this.getActor().create_transaction({
      ...arg,
      amount: BigInt(arg.amount),
    })
    return fromResult<bigint, TransactionError, ICreateTransactionResult, TransactionErrors>(
      result,
      (result) => ({ id: Number(result) }),
      (err) => fromTransactionError(err),
    )
  }

  /**
   * get transaction
   */
  public async getTransaction(id: number): Promise<ITransaction> {
    const result = await this.getActor().get_transaction({
      id: BigInt(id),
    })
    return fromResult<TransactionProfile, TransactionError, ITransaction, TransactionErrors>(
      result,
      (result) => this.fromTransactionProfile(result),
      (err) => fromTransactionError(err),
    )
  }

  /**
   * get paged transactions
   */
  public async getPagedTransaction(arg: IPagedTransactionArg): Promise<IPagedTransactionResult> {
    const result = await this.getActor().page_transaction({
      page_num: BigInt(arg.page),
      page_size: BigInt(arg.size),
      querystring: arg.query,
    })
    return fromResult<
      TransactionPage,
      TransactionError,
      IPagedTransactionResult,
      TransactionErrors
    >(
      result,
      (result) => ({
        page: Number(result.page_num),
        size: Number(result.page_size),
        total: Number(result.total_count),
        data: result.data.map((tx) => this.fromTransactionProfile(tx)),
      }),
      (err) => fromTransactionError(err),
    )
  }

  /**
   * modify transaction
   */
  public async modifyTransaction(arg: IModifyTransactionArg): Promise<ITransactionResult> {
    const result = await this.getActor().update_transaction({
      ...arg,
      transaction_id: BigInt(arg.id),
      amount: BigInt(arg.amount),
      block_height: BigInt(arg.block_height),
      memo: arg.memo,
    })
    return fromResult<boolean, TransactionError, ITransactionResult, TransactionErrors>(
      result,
      (result) => ({ success: result }),
      (err) => fromTransactionError(err),
    )
  }

  /**
   * create user
   */
  public async createUser(arg: ICreateUserArg): Promise<ICreateUserResult> {
    const result = await this.getActor().register_user(this.toUserRegisterCommand(arg))
    return this.fromRegisterUserResult(result)
  }

  /**
   * modify user
   */
  public async modifyUser(arg: IModifyUserArg): Promise<IUserResult> {
    const result = await this.getActor().edit_user(this.toUserEditCommand(arg))
    return this.fromBoolUserResult(result)
  }

  /**
   * enable user
   */
  public async enableUser(userId: string | ICPrincipal): Promise<IUserResult> {
    const result = await this.getActor().enable_user(castToPrincipal(userId))
    return this.fromBoolUserResult(result)
  }

  /**
   * disable user
   */
  public async disableUser(userId: string | ICPrincipal): Promise<IUserResult> {
    const result = await this.getActor().disable_user(castToPrincipal(userId))
    return this.fromBoolUserResult(result)
  }

  /**
   * get user
   */
  public async getUser(principal: string | ICPrincipal): Promise<IUserResult> {
    const result = await this.getActor().get_user(castPrincipalToString(principal))
    return this.fromBoolUserResult(result)
  }

  /**
   * get self
   */
  public async getSelf(): Promise<IUser> {
    const result = await this.getActor().get_self()
    return this.fromUserResult(result)
  }

  /**
   * greet
   */
  public async greet(input: string): Promise<string> {
    return this.getActor().greet(input)
  }

  private toCreateProjectCommand(from: ICreateProjectArg): ProjectCreateCommand {
    return {
      name: from.name,
    }
  }

  private fromProjectCreatedResult(from: ProjectCreatedResult): ICreateProjectResult {
    return fromResult<bigint, ProjectError, ICreateProjectResult, ProjectErrors>(
      from,
      (result) => ({ id: Number(result) }),
      (err) => fromProjectError(err),
    )
  }

  private toProjectPageQuery(from: IPagedProjectArg): ProjectPageQuery {
    return {
      page_num: BigInt(from.page),
      page_size: BigInt(from.size),
      querystring: from.query,
    }
  }

  private toProjectListQuery(from: IListProjectArg): ProjectListQuery {
    return {
      status: from.status.toLowerCase(),
    }
  }

  private toProjectEditCommand(from: IModifyProjectArg): ProjectEditCommand {
    return {
      ...from,
      id: BigInt(from.id),
      logo_id: BigInt(from.logo_id),
      roadmap_id: BigInt(from.roadmap_id),
      trust_by: this.toTrustBy(from.trust_by),
      tokenomics: this.toTokenomics(from.tokenomics),
      owner: castToPrincipal(from.owner),
      team: this.toTeam(from.team),
      capital_detail: this.toCapitalDetail(from.capital_detail),
    }
  }

  private fromProjectProfile(from: ProjectProfile): IProject {
    return {
      ...from,
      id: Number(from.id),
      status: fromProjectStatus(from.status),
      owner: castPrincipalToString(from.owner),
      progress: fromProgressStage(from.progress),
      logo_id: Number(from.logo_id),
      roadmap_id: Number(from.roadmap_id),
      trust_by: this.fromTrustBy(from.trust_by),
      tokenomics: this.fromTokenomics(from.tokenomics),
      team: this.fromTeam(from.team),
      capital_detail: this.fromCapitalDetail(from.capital_detail),
      created_at: Number(from.created_at),
      updated_at: Number(from.updated_at),
    }
  }

  private fromTrustBy(from: TrustBy): ITrustBy {
    return {
      ...from,
      logo_id: Number(from.logo_id),
    }
  }

  private toTrustBy(from: ITrustBy): TrustBy {
    return {
      ...from,
      logo_id: BigInt(from.logo_id),
    }
  }

  private fromTeam(from: Team): ITeam {
    return {
      ...from,
      picture_id: Number(from.picture_id),
      twitter: fromOption(from.twitter),
    }
  }

  private toTeam(from: ITeam): Team {
    return {
      ...from,
      picture_id: BigInt(from.picture_id),
      twitter: toOption(from.twitter),
    }
  }

  private fromTokenomics(from: Tokenomics): ITokenomics {
    return {
      ...from,
      total_supply: Number(from.total_supply),
    }
  }

  private toTokenomics(from: ITokenomics): Tokenomics {
    return {
      ...from,
      total_supply: BigInt(from.total_supply),
    }
  }

  private fromCapitalDetail(from: CapitalDetail): ICapitalDetail {
    return {
      ...from,
      price_per_icp: Number(from.price_per_icp),
      release: {
        ...from.release,
        method: fromReleaseMethod(from.release.method),
        start_date: Number(from.release.start_date),
        amount_per_day: Number(from.release.amount_per_day),
      },
      raise: {
        ...from.raise,
        amount: Number(from.raise.amount),
      },
    }
  }

  private toCapitalDetail(from: ICapitalDetail): CapitalDetail {
    return {
      ...from,
      price_per_icp: BigInt(from.price_per_icp),
      release: {
        ...from.release,
        method: toReleaseMethod(from.release.method),
        start_date: BigInt(from.release.start_date),
        amount_per_day: BigInt(from.release.amount_per_day),
      },
      raise: {
        ...from.raise,
        amount: BigInt(from.raise.amount),
      },
    }
  }

  private fromProjectPageResult(from: ProjectPageResult): IPagedProjectResult {
    return fromResult<ProjectPage, ProjectError, IPagedProjectResult, ProjectErrors>(
      from,
      (result) => ({
        page: Number(result.page_num),
        size: Number(result.page_size),
        total: Number(result.total_count),
        data: result.data.map((project) => this.fromProjectProfile(project)),
      }),
      (err) => fromProjectError(err),
    )
  }

  private toProjectIdCommand(id: number): ProjectIdCommand {
    return { id: BigInt(id) }
  }

  private fromProjectResult(from: ProjectResult): IProject {
    return fromResult<ProjectProfile, ProjectError, IProject, ProjectErrors>(
      from,
      (result) => this.fromProjectProfile(result),
      (err) => fromProjectError(err),
    )
  }

  private fromBoolProjectResult(from: BoolProjectResult): IProjectResult {
    return fromResult<boolean, ProjectError, IProjectResult, ProjectErrors>(
      from,
      (result) => ({ success: result }),
      (err) => fromProjectError(err),
    )
  }

  private fromTransactionProfile(from: TransactionProfile): ITransaction {
    return {
      ...from,
      id: Number(from.id),
      from_princiapl: castPrincipalToString(from.from_princiapl),
      amount: Number(from.amount),
      block_height: Number(from.block_height),
      created_at: Number(from.created_at),
    }
  }

  private toUserRegisterCommand(from: ICreateUserArg): UserRegisterCommand {
    return {
      ...from,
    }
  }

  private fromRegisterUserResult(from: RegisterUserResult): ICreateUserResult {
    return fromResult<string, UserError, ICreateUserResult, UserErrors>(
      from,
      (result) => ({ name: result }),
      (err) => fromUserError(err),
    )
  }

  private toUserEditCommand(from: IModifyUserArg): UserEditCommand {
    return {
      ...from,
      status: toUserStatus(from.status),
    }
  }

  private fromBoolUserResult(from: BoolUserResult): IUserResult {
    return fromResult<boolean, UserError, IUserResult, UserErrors>(
      from,
      (result) => ({ success: result }),
      (err) => fromUserError(err),
    )
  }

  private fromUserResult(from: UserResult): IUser {
    return fromResult<UserProfile, UserError, IUser, UserErrors>(
      from,
      (result) => ({
        ...result,
        id: Number(result.id),
        owner: castPrincipalToString(result.owner),
        status: fromUserStatus(result.status),
        avatar_id: Number(result.avatar_id),
        created_at: Number(result.created_at),
      }),
      (err) => fromUserError(err),
    )
  }
}
