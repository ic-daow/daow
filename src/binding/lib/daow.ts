import { ActorSubclass } from '@dfinity/agent'
import {
  _SERVICE,
  // @ts-ignore
  idlFactory,
  ProjectCreateCommand,
  ProjectCreatedResult,
  RegisterResult,
  UserProfile,
  UserRegisterCommand,
} from './canister/daow.did'
import { castPrincipalToString, createActor, fromOption, ICPrincipal } from './utils'

type IDaowActor = ActorSubclass<_SERVICE>

/**
 * create daow actor
 */
export const createDaowActor = async (canisterId: string): Promise<IDaowActor> => await createActor(canisterId, idlFactory)

export interface ICreateProjectArg {
}

const toCreateProjectCommand = (from: ICreateProjectArg): ProjectCreateCommand => ({})

export interface ICreateProjectResult {
}

const fromProjectCreatedResult = (from: ProjectCreatedResult): ICreateProjectResult => ({})

/**
 * create project
 */
export const createProject = (actor: IDaowActor) => async (arg: ICreateProjectArg) => {
  const result = await actor.create_project(toCreateProjectCommand(arg))
  return fromProjectCreatedResult(result)
}

/**
 * user
 */
export interface IRegisterUserArg {
}

const toUserRegisterCommand = (from: IRegisterUserArg): UserRegisterCommand => ({})

export interface IRegisterUserResult {
}

const fromRegisterResult = (from: RegisterResult): IRegisterUserResult => ({})

/**
 * register user
 */
export const registerUser = (actor: IDaowActor) => async (arg: IRegisterUserArg) => {
  const result = await actor.register_user(toUserRegisterCommand(arg))
  return fromRegisterResult(result)
}

export interface IUserProfile {
}

const fromUserProfile = (from: UserProfile): IUserProfile => ({})

/**
 * get self
 */
export const getSelf = (actor: IDaowActor) => async () => {
  const _result = await actor.get_self()
  const result = fromOption(_result)
  return result ? fromUserProfile(result) : null
}

/**
 * get user
 */
export const getUser = (actor: IDaowActor) => async (principal: string | ICPrincipal) => {
  const _result = await actor.get_user(castPrincipalToString(principal))
  const result = fromOption(_result)
  return result ? fromUserProfile(result) : null
}

/**
 * greet
 */
export const greet = (actor: IDaowActor) => async (input: string) => actor.greet(input)
