"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaowActor = exports.UserErrors = exports.UserStatus = exports.ProjectErrors = exports.ProgressStages = exports.ProjectStatus = exports.ReleaseMethods = void 0;
const actor_1 = require("./actor");
const daow_did_1 = require("./actor/daow.did");
const utils_1 = require("./utils");
var ReleaseMethods;
(function (ReleaseMethods) {
    ReleaseMethods["Linear"] = "Linear";
})(ReleaseMethods = exports.ReleaseMethods || (exports.ReleaseMethods = {}));
function fromReleaseMethod(method) {
    if ('Linear' in method) {
        return ReleaseMethods.Linear;
    }
    else {
        throw new Error('unimplemented');
    }
}
function toReleaseMethod(method) {
    switch (method) {
        case ReleaseMethods.Linear:
            return { Linear: null };
        default:
            throw new Error('unimplemented');
    }
}
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["Enable"] = "Enable";
    ProjectStatus["Disable"] = "Disable";
    ProjectStatus["Pending"] = "Pending";
})(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
function fromProjectStatus(status) {
    if ('Enable' in status) {
        return ProjectStatus.Enable;
    }
    else if ('Disable' in status) {
        return ProjectStatus.Disable;
    }
    else if ('Pending' in status) {
        return ProjectStatus.Pending;
    }
    else {
        throw new Error('unimplemented');
    }
}
var ProgressStages;
(function (ProgressStages) {
    ProgressStages["UnOpen"] = "Unopen";
    ProgressStages["InProgress"] = "InProgress";
    ProgressStages["Completed"] = "Completed";
})(ProgressStages = exports.ProgressStages || (exports.ProgressStages = {}));
function fromProgressStage(stage) {
    if ('Unopen' in stage) {
        return ProgressStages.UnOpen;
    }
    else if ('InProgress' in stage) {
        return ProgressStages.InProgress;
    }
    else if ('Completed' in stage) {
        return ProgressStages.Completed;
    }
    else {
        throw new Error('unimplemented');
    }
}
var ProjectErrors;
(function (ProjectErrors) {
    ProjectErrors["NotFound"] = "NotFound";
    ProjectErrors["AlreadyExists"] = "AlreadyExists";
    ProjectErrors["AlreadyCompleted"] = "AlreadyCompleted";
    ProjectErrors["UserNotFound"] = "UserNotFound";
})(ProjectErrors = exports.ProjectErrors || (exports.ProjectErrors = {}));
function fromProjectError(error) {
    if ('ProjectAlreadyExists' in error) {
        return ProjectErrors.AlreadyExists;
    }
    else if ('ProjectAlreadyCompleted' in error) {
        return ProjectErrors.AlreadyCompleted;
    }
    else if ('UserNotFound' in error) {
        return ProjectErrors.UserNotFound;
    }
    else if ('ProjectNotFound' in error) {
        return ProjectErrors.NotFound;
    }
    else {
        throw new Error('uninmplemented');
    }
}
var UserStatus;
(function (UserStatus) {
    UserStatus["Enable"] = "Enable";
    UserStatus["Disable"] = "Disable";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
function fromUserStatus(status) {
    if ('Enable' in status) {
        return UserStatus.Enable;
    }
    else if ('Disable' in status) {
        return UserStatus.Disable;
    }
    else {
        throw new Error('uninmplemented');
    }
}
function toUserStatus(status) {
    switch (status) {
        case UserStatus.Enable:
            return { Enable: null };
        case UserStatus.Disable:
            return { Disable: null };
        default:
            throw new Error('unimplemented');
    }
}
var UserErrors;
(function (UserErrors) {
    UserErrors["AlreadyExists"] = "AlreadyExists";
    UserErrors["AlreadyCompleted"] = "AlreadyCompleted";
    UserErrors["NotFound"] = "NotFound";
})(UserErrors = exports.UserErrors || (exports.UserErrors = {}));
function fromUserError(error) {
    if ('UserAlreadyExists' in error) {
        return UserErrors.AlreadyExists;
    }
    else if ('UserAlreadyDisable' in error) {
        return UserErrors.AlreadyCompleted;
    }
    else if ('UserNotFound' in error) {
        return UserErrors.NotFound;
    }
    else {
        throw new Error('uninmplemented');
    }
}
class DaowActor extends actor_1.BaseActor {
    /**
     * 创建actor
     */
    async create(cid, options) {
        await this._create(cid, daow_did_1.idlFactory, options);
        return this;
    }
    /**
     * create project
     */
    async createProject(arg) {
        const result = await this.getActor().create_project(this.toCreateProjectCommand(arg));
        return this.fromProjectCreatedResult(result);
    }
    /**
     * delete project
     */
    async deleteProject(projectId) {
        const result = await this.getActor().delete_projet(this.toProjectIdCommand(projectId));
        return this.fromBoolProjectResult(result);
    }
    /**
     * modify project
     */
    async modifyProject(project) {
        const result = await this.getActor().edit_project(this.toProjectEditCommand(project));
        return this.fromBoolProjectResult(result);
    }
    /**
     * get project
     */
    async getProject(projectId) {
        const result = await this.getActor().get_project(this.toProjectIdCommand(projectId));
        return this.fromProjectResult(result);
    }
    /**
     * get paged project
     */
    async getPagedProject(arg) {
        const result = await this.getActor().page_project(this.toProjectPageQuery(arg));
        return this.fromProjectPageResult(result);
    }
    /**
     * get list project
     */
    async getListProject(arg) {
        const result = await this.getActor().list_projects(this.toProjectListQuery(arg));
        return { data: result.map((res) => this.fromProjectProfile(res)) };
    }
    /**
     * create user
     */
    async createUser(arg) {
        const result = await this.getActor().register_user(this.toUserRegisterCommand(arg));
        return this.fromRegisterUserResult(result);
    }
    /**
     * modify user
     */
    async modifyUser(arg) {
        const result = await this.getActor().edit_user(this.toUserEditCommand(arg));
        return this.fromBoolUserResult(result);
    }
    /**
     * enable user
     */
    async enableUser(userId) {
        const result = await this.getActor().enable_user((0, utils_1.castToPrincipal)(userId));
        return this.fromBoolUserResult(result);
    }
    /**
     * disable user
     */
    async disableUser(userId) {
        const result = await this.getActor().disable_user((0, utils_1.castToPrincipal)(userId));
        return this.fromBoolUserResult(result);
    }
    /**
     * get user
     */
    async getUser(principal) {
        const result = await this.getActor().get_user((0, utils_1.castPrincipalToString)(principal));
        return this.fromBoolUserResult(result);
    }
    /**
     * get self
     */
    async getSelf() {
        const result = await this.getActor().get_self();
        return this.fromUserResult(result);
    }
    /**
     * greet
     */
    async greet(input) {
        return this.getActor().greet(input);
    }
    toCreateProjectCommand(from) {
        return {
            name: from.name,
        };
    }
    fromProjectCreatedResult(from) {
        return (0, utils_1.fromResult)(from, (result) => ({ id: Number(result) }), (err) => fromProjectError(err));
    }
    toProjectEditCommand(from) {
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
            owner: (0, utils_1.castToPrincipal)(from.owner),
            team: {
                ...from.team,
                picture_id: BigInt(from.team.picture_id),
                twitter: (0, utils_1.toOption)(from.team.twitter),
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
        };
    }
    toProjectPageQuery(from) {
        return {
            page_num: BigInt(from.page),
            page_size: BigInt(from.size),
            querystring: from.query,
        };
    }
    toProjectListQuery(from) {
        return {
            status: from.status.toLowerCase(),
        };
    }
    fromProjectProfile(from) {
        return {
            ...from,
            id: Number(from.id),
            status: fromProjectStatus(from.status),
            owner: (0, utils_1.castPrincipalToString)(from.owner),
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
                twitter: (0, utils_1.fromOption)(from.team.twitter),
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
        };
    }
    fromProjectPageResult(from) {
        return (0, utils_1.fromResult)(from, (result) => ({
            page: Number(result.page_num),
            size: Number(result.page_size),
            total: Number(result.total_count),
            data: result.data.map((project) => this.fromProjectProfile(project)),
        }), (err) => fromProjectError(err));
    }
    toProjectIdCommand(id) {
        return { id: BigInt(id) };
    }
    fromProjectResult(from) {
        return (0, utils_1.fromResult)(from, (result) => this.fromProjectProfile(result), (err) => fromProjectError(err));
    }
    fromBoolProjectResult(from) {
        return (0, utils_1.fromResult)(from, (result) => ({ success: result }), (err) => fromProjectError(err));
    }
    toUserRegisterCommand(from) {
        return {
            ...from,
        };
    }
    fromRegisterUserResult(from) {
        return (0, utils_1.fromResult)(from, (result) => ({ name: result }), (err) => fromUserError(err));
    }
    toUserEditCommand(from) {
        return {
            ...from,
            status: toUserStatus(from.status),
        };
    }
    fromBoolUserResult(from) {
        return (0, utils_1.fromResult)(from, (result) => ({ success: result }), (err) => fromUserError(err));
    }
    fromUserResult(from) {
        return (0, utils_1.fromResult)(from, (result) => ({
            ...result,
            id: Number(result.id),
            owner: (0, utils_1.castPrincipalToString)(result.owner),
            status: fromUserStatus(result.status),
            avatar_id: Number(result.avatar_id),
            created_at: Number(result.created_at),
        }), (err) => fromUserError(err));
    }
}
exports.DaowActor = DaowActor;
