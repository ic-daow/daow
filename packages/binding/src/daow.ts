import { BaseActor, ICreateActorOptions } from './actor'
import {
  _SERVICE,
  idlFactory,
  ProjectCreateCommand,
  ProjectCreatedResult,
  RegisterResult,
  UserProfile,
  UserRegisterCommand,
} from './actor/daow.did'
import { castPrincipalToString, fromOption, ICPrincipal } from './utils'

/**
 * 创建dao参数
 */
export interface ICreateProjectArg {
}

/**
 * dao
 */
export interface ICreateProjectResult {
}

/**
 * 注册账户参数
 */
export interface IRegisterUserArg {
}

/**
 * 注册账户返回值
 */
export interface IRegisterUserResult {
}

/**
 * 用户对象
 */
export interface IUserProfile {
}

export class DaowActor extends BaseActor<_SERVICE> {
  /**
   * 创建actor
   */
  public async create(cid: string, options?: ICreateActorOptions) {
    await this._create(cid, idlFactory, options)
    return this
  }

  /**
   * create project
   */
  public async createProject(arg: ICreateProjectArg) {
    const result = await this.getActor().create_project(this.toCreateProjectCommand(arg))
    return this.fromProjectCreatedResult(result)
  }

  /**
   * register user
   */
  public async registerUser(arg: IRegisterUserArg) {
    const result = await this.getActor().register_user(this.toUserRegisterCommand(arg))
    return this.fromRegisterResult(result)
  }

  /**
   * get self
   */
  public async getSelf() {
    const _result = await this.getActor().get_self()
    const result = fromOption(_result)
    return result ? this.fromUserProfile(result) : null
  }

  /**
   * get user
   */
  public async getUser(principal: string | ICPrincipal) {
    const _result = await this.getActor().get_user(castPrincipalToString(principal))
    const result = fromOption(_result)
    return result ? this.fromUserProfile(result) : null
  }

  /**
   * greet
   */
  public async greet(input: string) {
    return this.getActor().greet(input)
  }

  private toCreateProjectCommand(from: ICreateProjectArg): ProjectCreateCommand {
    return {}
  }

  private fromProjectCreatedResult(from: ProjectCreatedResult): ICreateProjectResult {
    return {}
  }

  private toUserRegisterCommand(from: IRegisterUserArg): UserRegisterCommand {
    return {}
  }

  private fromRegisterResult(from: RegisterResult): IRegisterUserResult {
    return {}
  }

  private fromUserProfile(from: UserProfile): IUserProfile {
    return {}
  }
}
