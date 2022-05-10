import { Principal } from '@dfinity/principal';
/**
 * IC actor type wrapper
 */
export declare type ICPrincipal = Principal;
export declare type ICOption<T> = [T] | [];
export declare type ICResult<Ok, Err> = {
    Ok: Ok;
} | {
    ok: Ok;
} | {
    Err: Err;
} | {
    err: Err;
};
/**
 * principal
 */
export declare function castPrincipalToString(principal: string | ICPrincipal): string;
export declare function castToPrincipal(principal: string | ICPrincipal): Principal;
/**
 * option
 */
export declare function fromOption<T>(value: ICOption<T>): T | undefined;
export declare function toOption<T>(value: T | undefined): ICOption<T>;
/**
 * result
 */
export declare type IResult<Ok, Err> = {
    data: Ok;
} | {
    error: Err;
};
export declare function fromResult<Ok, Err, IOk = Ok, IError = Err>(result: ICResult<Ok, Err>, convertOk?: (ok: Ok) => IOk, convertErr?: (err: Err) => IError): IOk;
