import { Actor, ActorConfig, HttpAgent, HttpAgentOptions } from '@dfinity/agent'
import { Principal } from '@dfinity/principal'
import { IDL } from '@dfinity/candid'

/**
 * IC canister type wrapper
 */
export type ICPrincipal = Principal
export type ICOption<T> = [T] | []
export type ICResult<Ok, Err> = { Ok: Ok } | { Err: Err }

/**
 * create actor
 */
type ICreateActorOptions = {
  production?: boolean;
  agentOptions?: Partial<HttpAgentOptions>;
  actorOptions?: Partial<ActorConfig>;
}

export const createActor = async (canisterId: string | ICPrincipal, idlFactory: IDL.InterfaceFactory, options: ICreateActorOptions = { production: false }) => {
  const agent = new HttpAgent({ ...options?.agentOptions })
  if (!options.production) {
    try {
      await agent.fetchRootKey()
    } catch (e) {
      console.warn('Unable to fetch root key. Check to ensure that your local replica is running')
      throw e
    }
  }
  return Promise.resolve(Actor.createActor(idlFactory, {
    agent,
    canisterId, ...options?.actorOptions,
  }))
}

/**
 * principal
 */
export const castPrincipalToString = (principal: string | ICPrincipal) => principal instanceof Principal ? principal.toText() : principal

/**
 * option
 */
export const fromOption = <T>(value: ICOption<T>): T | undefined => value.length !== 0 ? value[0] : undefined

export const toOption = <T>(value: T | undefined): ICOption<T> => value !== undefined ? [value] : []

/**
 * result
 */
export type IResult<Ok, Err> = { data: Ok } | { error: Err }

export const fromResult = <Ok, Err, IOk = Ok, IError = Err>(
  result: ICResult<Ok, Err>,
  convertOk?: (ok: Ok) => IOk,
  convertErr?: (err: Err) => IError,
): IResult<IOk, IError> => {
  if ('Ok' in result) {
    // @ts-ignore
    return { data: convertOk ? convertOk(result.Ok) : result.Ok }
  } else {
    // 'Err' in result
    // @ts-ignore
    return { error: convertErr ? convertErr(result.Err) : result.Err }
  }
}
