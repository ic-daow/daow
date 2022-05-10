"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromResult = exports.toOption = exports.fromOption = exports.castToPrincipal = exports.castPrincipalToString = void 0;
const principal_1 = require("@dfinity/principal");
/**
 * principal
 */
function castPrincipalToString(principal) {
    return principal instanceof principal_1.Principal ? principal.toText() : principal;
}
exports.castPrincipalToString = castPrincipalToString;
function castToPrincipal(principal) {
    return typeof principal === 'string' ? principal_1.Principal.fromText(principal) : principal;
}
exports.castToPrincipal = castToPrincipal;
/**
 * option
 */
function fromOption(value) {
    return value.length !== 0 ? value[0] : undefined;
}
exports.fromOption = fromOption;
function toOption(value) {
    return value !== undefined ? [value] : [];
}
exports.toOption = toOption;
function fromResult(result, convertOk, convertErr) {
    if ('Ok' in result || 'ok' in result) {
        let ok;
        if ('Ok' in result) {
            ok = result.Ok;
        }
        else if ('ok' in result) {
            ok = result.ok;
        }
        else {
            throw new Error('unimplemented');
        }
        // @ts-ignore
        return convertOk ? convertOk(ok) : ok;
    }
    else if ('Err' in result || 'err' in result) {
        let err;
        if ('Err' in result) {
            err = result.Err;
        }
        else if ('err' in result) {
            err = result.err;
        }
        else {
            throw new Error('unimplemented');
        }
        // 'Err' | 'err' in result
        throw convertErr ? convertErr(err) : err;
    }
    else {
        throw new Error('unimplemented');
    }
}
exports.fromResult = fromResult;
