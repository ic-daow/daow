import { Principal } from '@dfinity/principal'

/**
 * IC actor type wrapper
 */
export type ICPrincipal = Principal
export type ICOption<T> = [T] | []
export type ICResult<Ok, Err> = { Ok: Ok } | { Err: Err }

/**
 * principal
 */
export function castPrincipalToString(principal: string | ICPrincipal) {
  return principal instanceof Principal ? principal.toText() : principal
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
): IResult<IOk, IError> {
  if ('Ok' in result) {
    // @ts-ignore
    return { data: convertOk ? convertOk(result.Ok) : result.Ok }
  } else {
    // 'Err' in result
    // @ts-ignore
    return { error: convertErr ? convertErr(result.Err) : result.Err }
  }
}
