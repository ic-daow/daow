import { BaseActor, ICreateActorOptions } from './actor'
import {
  _SERVICE,
  BoolProjectResult,
  BoolUserResult,
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
  ProjectResult,
  ProjectStatus as _ProjectStatus,
  RegisterUserResult,
  ReleaseMethod,
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
    return { data: result.map((res) => this.fromProjectProfile(res)) }
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

  private toProjectEditCommand(from: IModifyProjectArg): ProjectEditCommand {
    return {
      ...from,
      id: BigInt(from.id),
      logo_id: BigInt(from.logo_id),
      roadmap_id: BigInt(from.roadmap_id),
      trust_by: {
        ...from.trust_by,
        logo_id: BigInt(from.trust_by.logo_id),
      },
      tokenomics: {
        ...from.tokenomics,
        total_supply: BigInt(from.tokenomics.total_supply),
      },
      owner: castToPrincipal(from.owner),
      team: {
        ...from.team,
        picture_id: BigInt(from.team.picture_id),
        twitter: toOption(from.team.twitter),
      },
      capital_detail: {
        ...from.capital_detail,
        price_per_icp: BigInt(from.capital_detail.price_per_icp),
        release: {
          ...from.capital_detail.release,
          method: toReleaseMethod(from.capital_detail.release.method),
          start_date: BigInt(from.capital_detail.release.start_date),
          amount_per_day: BigInt(from.capital_detail.release.amount_per_day),
        },
        raise: {
          ...from.capital_detail.raise,
          amount: BigInt(from.capital_detail.raise.amount),
        },
      },
    }
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

  private fromProjectProfile(from: ProjectProfile): IProject {
    return {
      ...from,
      id: Number(from.id),
      status: fromProjectStatus(from.status),
      owner: castPrincipalToString(from.owner),
      progress: fromProgressStage(from.progress),
      logo_id: Number(from.logo_id),
      roadmap_id: Number(from.roadmap_id),
      trust_by: {
        ...from.trust_by,
        logo_id: Number(from.trust_by.logo_id),
      },
      tokenomics: {
        ...from.tokenomics,
        total_supply: Number(from.tokenomics.total_supply),
      },
      team: {
        ...from.team,
        picture_id: Number(from.team.picture_id),
        twitter: fromOption(from.team.twitter),
      },
      capital_detail: {
        ...from.capital_detail,
        price_per_icp: Number(from.capital_detail.price_per_icp),
        release: {
          ...from.capital_detail.release,
          method: fromReleaseMethod(from.capital_detail.release.method),
          start_date: Number(from.capital_detail.release.start_date),
          amount_per_day: Number(from.capital_detail.release.amount_per_day),
        },
        raise: {
          ...from.capital_detail.raise,
          amount: Number(from.capital_detail.raise.amount),
        },
      },
      created_at: Number(from.created_at),
      updated_at: Number(from.updated_at),
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
