"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaowActor = exports.UserErrors = exports.UserStatus = exports.TransactionErrors = exports.ProposalClaimErrors = exports.ProposalStates = exports.ProjectErrors = exports.ProjectStatus = exports.ProgressStages = exports.ReleaseMethods = void 0;
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
var ProgressStages;
(function (ProgressStages) {
    ProgressStages["UnOpen"] = "Unopen";
    ProgressStages["InProgress"] = "InProgress";
    ProgressStages["ToClaim"] = "ToClaim";
    ProgressStages["Claimed"] = "Claimed";
    ProgressStages["Completed"] = "Completed";
})(ProgressStages = exports.ProgressStages || (exports.ProgressStages = {}));
function fromProgressStage(stage) {
    if ('Unopen' in stage) {
        return ProgressStages.UnOpen;
    }
    else if ('InProgress' in stage) {
        return ProgressStages.InProgress;
    }
    else if ('ToClaim' in stage) {
        return ProgressStages.ToClaim;
    }
    else if ('Claimed' in stage) {
        return ProgressStages.Claimed;
    }
    else if ('Completed' in stage) {
        return ProgressStages.Completed;
    }
    else {
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
var ProjectErrors;
(function (ProjectErrors) {
    ProjectErrors["NotFound"] = "NotFound";
    ProjectErrors["AlreadyExists"] = "AlreadyExists";
    ProjectErrors["AlreadyCompleted"] = "AlreadyCompleted";
    ProjectErrors["UserNotFound"] = "UserNotFound";
    ProjectErrors["ProjectReleaseTimeTooEarly"] = "ProjectReleaseTimeTooEarly";
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
    else if ('ProjectReleaseTimeTooEarly' in error) {
        return ProjectErrors.ProjectReleaseTimeTooEarly;
    }
    else {
        throw new Error('unimplemented');
    }
}
var ProposalStates;
(function (ProposalStates) {
    ProposalStates["Open"] = "Open";
    ProposalStates["Executing"] = "Executing";
    ProposalStates["Accepted"] = "Accepted";
    ProposalStates["Succeeded"] = "Succeeded";
    ProposalStates["Rejected"] = "Rejected";
    ProposalStates["Failed"] = "Failed";
})(ProposalStates = exports.ProposalStates || (exports.ProposalStates = {}));
function fromProposalState(state) {
    if ('Failed' in state) {
        return ProposalStates.Failed;
    }
    else if ('Open' in state) {
        return ProposalStates.Open;
    }
    else if ('Executing' in state) {
        return ProposalStates.Executing;
    }
    else if ('Rejected' in state) {
        return ProposalStates.Rejected;
    }
    else if ('Succeeded' in state) {
        return ProposalStates.Succeeded;
    }
    else if ('Accepted' in state) {
        return ProposalStates.Accepted;
    }
    else {
        throw new Error('unimplemented');
    }
}
function extractProposalFailedReason(state) {
    if ('Failed' in state) {
        return state.Failed;
    }
    else {
        return null;
    }
}
var Votes;
(function (Votes) {
    Votes["Yes"] = "Yes";
    Votes["No"] = "No";
})(Votes || (Votes = {}));
function toVote(vote) {
    switch (vote) {
        case Votes.Yes:
            return { Yes: null };
        case Votes.No:
            return { No: null };
        default:
            throw new Error('unimplemented');
    }
}
var ProposalClaimErrors;
(function (ProposalClaimErrors) {
    ProposalClaimErrors["NotFound"] = "NotFound";
    ProposalClaimErrors["AlreadyExists"] = "AlreadyExists";
    ProposalClaimErrors["Invalid"] = "Invalid";
    ProposalClaimErrors["AlreadyVoted"] = "AlreadyVoted";
    ProposalClaimErrors["NotOpen"] = "NotOpen";
})(ProposalClaimErrors = exports.ProposalClaimErrors || (exports.ProposalClaimErrors = {}));
function fromClaimError(error) {
    if ('ProposalNotFound' in error) {
        return ProposalClaimErrors.NotFound;
    }
    else if ('ProposalAlreadyExists' in error) {
        return ProposalClaimErrors.AlreadyExists;
    }
    else if ('ProjectInvalid' in error) {
        return ProposalClaimErrors.Invalid;
    }
    else if ('VoterAlreadyVoted' in error) {
        return ProposalClaimErrors.AlreadyVoted;
    }
    else if ('ProposalStateNotOpen' in error) {
        return ProposalClaimErrors.NotOpen;
    }
    else {
        throw new Error('unimplemented');
    }
}
var TransactionErrors;
(function (TransactionErrors) {
    TransactionErrors["NotFound"] = "NotFound";
    TransactionErrors["AlreadyExists"] = "AlreadyExists";
    TransactionErrors["NotFinalized"] = "NotFinalized";
    TransactionErrors["BlockHeightNotValid"] = "BlockHeightNotValid";
    TransactionErrors["ProjectInvalid"] = "ProjectInvalid";
})(TransactionErrors = exports.TransactionErrors || (exports.TransactionErrors = {}));
function fromTransactionError(error) {
    if ('TransactionAlreadyExists' in error) {
        return TransactionErrors.AlreadyExists;
    }
    else if ('TransactionNotFound' in error) {
        return TransactionErrors.NotFound;
    }
    else if ('TransactionNotFinalized' in error) {
        return TransactionErrors.NotFinalized;
    }
    else if ('BlockHeightNotValid' in error) {
        return TransactionErrors.BlockHeightNotValid;
    }
    else if ('ProjectInvalid' in error) {
        return TransactionErrors.ProjectInvalid;
    }
    else {
        throw new Error('unimplemented');
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
        throw new Error('unimplemented');
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
        throw new Error('unimplemented');
    }
}
/**
 *******************************************************************************
 ********************************** Canister ***********************************
 *******************************************************************************
 */
class DaowActor extends actor_1.BaseActor {
    /**
     * 创建actor
     */
    async create(cid, options) {
        await this._create(cid, daow_did_1.idlFactory, options);
        return this;
    }
    /**
     ********************************* Project ***********************************
     */
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
        const result = await this.getActor().delete_project(this.toProjectIdCommand(projectId));
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
     * submit project
     */
    async submitProject(id) {
        const result = await this.getActor().submit_project({
            id: BigInt(id),
        });
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
        const result = await this.getActor().page_projects(this.toPageQuery(arg));
        return this.fromProjectPageResult(result);
    }
    /**
     * get list project
     */
    async getListProject(arg) {
        const result = await this.getActor().list_projects(this.toProjectListQuery(arg));
        return (0, utils_1.fromResult)(result, (result) => ({ data: result.map((res) => this.fromProjectProfile(res)) }), (err) => fromProjectError(err));
    }
    /**
     * apply project capital
     */
    async applyProjectCapital(arg) {
        const result = await this.getActor().apply_project_capital_detail({
            id: BigInt(arg.id),
            capital_detail: this.toCapitalDetail(arg.capital_detail),
        });
        return this.fromBoolProjectResult(result);
    }
    /**
     * apply project description
     */
    async applyProjectDescription(arg) {
        const result = await this.getActor().apply_project_description({
            id: BigInt(arg.id),
            description: arg.description,
        });
        return this.fromBoolProjectResult(result);
    }
    /**
     * apply project roadmap
     */
    async applyProjectRoadmap(arg) {
        const result = await this.getActor().apply_project_roadmap({
            id: BigInt(arg.id),
            roadmap: arg.roadmap,
        });
        return this.fromBoolProjectResult(result);
    }
    /**
     * apply project team
     */
    async applyProjectTeam(arg) {
        const result = await this.getActor().apply_project_team({
            id: BigInt(arg.id),
            team: this.toTeam(arg.team),
        });
        return this.fromBoolProjectResult(result);
    }
    /**
     * apply project tokenomics
     */
    async applyProjectTokenomics(arg) {
        const result = await this.getActor().apply_project_tokenomics({
            id: BigInt(arg.id),
            tokenomics: this.toTokenomics(arg.tokenomics),
        });
        return this.fromBoolProjectResult(result);
    }
    /**
     * apply project trust by
     */
    async applyProjectTrustBy(arg) {
        const result = await this.getActor().apply_project_trust_by({
            id: BigInt(arg.id),
            trust_by: this.toTrustBy(arg.trust_by),
        });
        return this.fromBoolProjectResult(result);
    }
    /**
     ****************************** Claim Proposal *******************************
     */
    /**
     * create claim proposal
     */
    async createClaimProposal(arg) {
        const result = await this.getActor().submit_claim_proposal({
            ...arg,
            project_id: BigInt(arg.project_id),
            pamount_e8s: BigInt(arg.pamount_e8s),
        });
        return (0, utils_1.fromResult)(result, (result) => ({ id: Number(result) }), (err) => fromClaimError(err));
    }
    /**
     * vote claim proposal
     */
    async voteClaimProposal(arg) {
        const result = await this.getActor().vote_claim_proposal({
            ...arg,
            proposal_id: BigInt(arg.proposal_id),
            vote: toVote(arg.vote),
        });
        return (0, utils_1.fromResult)(result, (result) => ({
            state: fromProposalState(result),
            failed_reason: extractProposalFailedReason(result),
        }), (err) => ({ error: err }));
    }
    /**
     * get claim proposal
     */
    async getClaimProposal(arg) {
        const result = await this.getActor().get_claim_proposal({
            ...arg,
            id: BigInt(arg.id),
        });
        return (0, utils_1.fromResult)(result, (result) => this.fromClaimProposal(result), (err) => fromClaimError(err));
    }
    /**
     * get paged claim proposal
     */
    async getPagedClaimProposal(arg) {
        const result = await this.getActor().page_claim_proposals({
            ...arg,
            page_num: BigInt(arg.page),
            page_size: BigInt(arg.size),
            querystring: arg.query,
        });
        return (0, utils_1.fromResult)(result, (result) => ({
            ...result,
            page: Number(result.page_num),
            size: Number(result.page_size),
            total: Number(result.total_count),
            data: result.data.map((it) => this.fromClaimProposal(it)),
        }), (err) => fromClaimError(err));
    }
    /**
     ******************************** Transaction ********************************
     */
    /**
     * create transaction
     */
    async createTransaction(arg) {
        const result = await this.getActor().create_transaction({
            ...arg,
            project_id: BigInt(arg.project_id),
            amount: BigInt(arg.amount),
            memo: BigInt(arg.memo),
        });
        return (0, utils_1.fromResult)(result, (result) => ({ id: Number(result) }), (err) => fromTransactionError(err));
    }
    /**
     * modify transaction
     */
    async modifyTransaction(arg) {
        const result = await this.getActor().update_transaction({
            ...arg,
            project_id: BigInt(arg.project_id),
            transaction_id: BigInt(arg.tx_id),
            amount: BigInt(arg.amount),
            block_height: BigInt(arg.block_height),
            memo: BigInt(arg.memo),
        });
        return (0, utils_1.fromResult)(result, (result) => ({ success: result }), (err) => fromTransactionError(err));
    }
    /**
     * verify transaction
     */
    async verifyTransaction(arg) {
        const result = await this.getActor().valid_transaction({
            ...arg,
            project_id: BigInt(arg.project_id),
            block_height: BigInt(arg.block_height),
        });
        return (0, utils_1.fromResult)(result, (result) => ({ success: result }), (err) => fromTransactionError(err));
    }
    /**
     * get transaction
     */
    async getTransaction(id) {
        const result = await this.getActor().get_transaction({
            id: BigInt(id),
        });
        return (0, utils_1.fromResult)(result, (result) => this.fromTransactionProfile(result), (err) => fromTransactionError(err));
    }
    /**
     * get paged transactions
     */
    async getPagedTransaction(arg) {
        const result = await this.getActor().page_transactions({
            page_num: BigInt(arg.page),
            page_size: BigInt(arg.size),
            querystring: arg.query,
        });
        return (0, utils_1.fromResult)(result, (result) => ({
            page: Number(result.page_num),
            size: Number(result.page_size),
            total: Number(result.total_count),
            data: result.data.map((tx) => this.fromTransactionProfile(tx)),
        }), (err) => fromTransactionError(err));
    }
    /**
     ********************************** User *************************************
     */
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
     ********************************* Others ************************************
     */
    /**
     * get balance
     */
    async getBalance() {
        const result = await this.getActor().cansiter_balance();
        return { e8s: Number(result.e8s) };
    }
    /**
     * greet
     */
    async greet(input) {
        return this.getActor().greet(input);
    }
    /**
     ***************************** Private Methods *******************************
     */
    toCreateProjectCommand(from) {
        return {
            name: from.name,
        };
    }
    fromProjectCreatedResult(from) {
        return (0, utils_1.fromResult)(from, (result) => ({ id: Number(result) }), (err) => fromProjectError(err));
    }
    toPageQuery(from) {
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
    toProjectEditCommand(from) {
        return {
            ...from,
            id: BigInt(from.id),
            logo_id: BigInt(from.logo_id),
            roadmap_id: BigInt(from.roadmap_id),
            trust_by: this.toTrustBy(from.trust_by),
            tokenomics: this.toTokenomics(from.tokenomics),
            owner: (0, utils_1.castToPrincipal)(from.owner),
            team: this.toTeam(from.team),
            capital_detail: this.toCapitalDetail(from.capital_detail),
        };
    }
    fromProjectProfile(from) {
        const latestClaimAt = (0, utils_1.fromOption)(from.latest_claim_at);
        return {
            ...from,
            id: Number(from.id),
            status: fromProjectStatus(from.status),
            owner: (0, utils_1.castPrincipalToString)(from.owner),
            progress: fromProgressStage(from.progress),
            logo_id: Number(from.logo_id),
            roadmap_id: Number(from.roadmap_id),
            trust_by: this.fromTrustBy(from.trust_by),
            actual_raised: Number(from.actual_raised),
            tokenomics: this.fromTokenomics(from.tokenomics),
            team: this.fromTeam(from.team),
            capital_detail: this.fromCapitalDetail(from.capital_detail),
            claimed: Number(from.claimed),
            latest_claim_at: (0, utils_1.fromOption)(from.latest_claim_at),
        };
    }
    fromTrustBy(from) {
        return {
            ...from,
            logo_id: Number(from.logo_id),
        };
    }
    toTrustBy(from) {
        return {
            ...from,
            logo_id: BigInt(from.logo_id),
        };
    }
    fromTeam(from) {
        return {
            ...from,
            picture_id: Number(from.picture_id),
            twitter: (0, utils_1.fromOption)(from.twitter),
        };
    }
    toTeam(from) {
        return {
            ...from,
            picture_id: BigInt(from.picture_id),
            twitter: (0, utils_1.toOption)(from.twitter),
        };
    }
    fromTokenomics(from) {
        return {
            ...from,
            total_supply: Number(from.total_supply),
        };
    }
    toTokenomics(from) {
        return {
            ...from,
            total_supply: BigInt(from.total_supply),
        };
    }
    fromCapitalDetail(from) {
        return {
            ...from,
            price_per_icp: Number(from.price_per_icp),
            release: {
                ...from.release,
                method: fromReleaseMethod(from.release.method),
                amount_per_day: Number(from.release.amount_per_day),
            },
            raise: {
                ...from.raise,
                amount: Number(from.raise.amount),
            },
        };
    }
    toCapitalDetail(from) {
        return {
            ...from,
            price_per_icp: BigInt(from.price_per_icp),
            release: {
                ...from.release,
                method: toReleaseMethod(from.release.method),
                start_date: BigInt(from.release.start_date),
                amount_per_day: BigInt(from.release.amount_per_day),
            },
            raise: {
                ...from.raise,
                amount: BigInt(from.raise.amount),
            },
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
    fromTransactionProfile(from) {
        return {
            ...from,
            tx_id: Number(from.id),
            project_id: Number(from.project_id),
            from_principal: (0, utils_1.castPrincipalToString)(from.from_princiapl),
            amount: Number(from.amount),
            block_height: Number(from.block_height),
            memo: Number(from.memo),
        };
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
        }), (err) => fromUserError(err));
    }
    fromClaimProposal(from) {
        return {
            ...from,
            id: Number(from.id),
            proposer: (0, utils_1.castPrincipalToString)(from.proposer),
            voters: from.voters.map((voter) => (0, utils_1.castPrincipalToString)(voter)),
            state: fromProposalState(from.state),
            failed_reason: extractProposalFailedReason(from.state),
            payload: {
                ...from.payload,
                project_id: Number(from.payload.project_id),
                pamount_e8s: Number(from.payload.pamount_e8s),
            },
            votes_yes: {
                amount_e8s: Number(from.votes_yes.amount_e8s),
            },
            votes_no: {
                amount_e8s: Number(from.votes_no.amount_e8s),
            },
        };
    }
}
exports.DaowActor = DaowActor;
