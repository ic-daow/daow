import { Principal } from '@dfinity/principal'

/**
 * IC actor type wrapper
 */
export type ICPrincipal = Principal
export type ICOption<T> = [T] | []
export type ICResult<Ok, Err> = { Ok: Ok } | { ok: Ok } | { Err: Err } | { err: Err }

/**
 * principal
 */
export function castPrincipalToString(principal: string | ICPrincipal) {
  return principal instanceof Principal ? principal.toText() : principal
}

export function castToPrincipal(principal: string | ICPrincipal) {
  return typeof principal === 'string' ? Principal.fromText(principal) : principal
}

/**
 * option
 */
export function fromOption<T>(value: ICOption<T>): T | undefined {
  return value.length !== 0 ? value[0] : undefined
}

export function toOption<T>(value: T | undefined): ICOption<T> {
  return value !== undefined ? [value] : []
}

/**
 * result
 */
export type IResult<Ok, Err> = { data: Ok } | { error: Err }

export function fromResult<Ok, Err, IOk = Ok, IError = Err>(
  result: ICResult<Ok, Err>,
  convertOk?: (ok: Ok) => IOk,
  convertErr?: (err: Err) => IError,
): IOk {
  if ('Ok' in result || 'ok' in result) {
    let ok
    if ('Ok' in result) {
      ok = result.Ok
    } else if ('ok' in result) {
      ok = result.ok
    } else {
      throw new Error('unimplemented')
    }
    // @ts-ignore
    return convertOk ? convertOk(ok) : ok
  } else if ('Err' in result || 'err' in result) {
    let err
    if ('Err' in result) {
      err = result.Err
    } else if ('err' in result) {
      err = result.err
    } else {
      throw new Error('unimplemented')
    }
    // 'Err' | 'err' in result
    throw convertErr ? convertErr(err) : err
  } else {
    throw new Error('unimplemented')
  }
}
