"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = exports.createDaowActor = void 0;
//@ts-ignore
const daow_did_1 = require("./canister/daow.did");
const utils_1 = require("./utils");
const createDaowActor = async (canisterId) => await (0, utils_1.createActor)(canisterId, daow_did_1.idlFactory);
exports.createDaowActor = createDaowActor;
const toCreateProjectCommand = (from) => {
    return {
        'title': string,
        'logo': Array < number > ,
        'memo': [] | [string],
        'tags': Array < string > ,
        'links': Array < string > ,
        'information': string,
        'contact_info': Array < string > ,
        'wallet_addr': string,
        'owner_info': string,
    };
};
const fromProjectCreatedResult = (from) => { };
const createProject = (actor) => async (createCommand) => {
    const result = await actor.create_project(toCreateProjectCommand(createCommand));
    return fromProjectCreatedResult(result);
};
exports.createProject = createProject;
