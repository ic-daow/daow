"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseActor = void 0;
const agent_1 = require("@dfinity/agent");
const auth_client_1 = require("@dfinity/auth-client");
const assert_1 = __importDefault(require("assert"));
class BaseActor {
    canisterId;
    idlFactory;
    agent;
    actor;
    /**
     * canister id
     */
    getCanisterId() {
        (0, assert_1.default)(this.canisterId !== undefined, 'canisterId is not defined');
        return this.canisterId;
    }
    /**
     * idlFactory
     */
    getIdlFactory() {
        (0, assert_1.default)(this.idlFactory !== undefined, 'idlFactory is not defined');
        return this.idlFactory;
    }
    /**
     * agent
     */
    getAgent() {
        (0, assert_1.default)(this.agent !== undefined, 'agent is not defined');
        return this.agent;
    }
    /**
     * actor
     */
    getActor() {
        (0, assert_1.default)(this.actor !== undefined, 'actor is not defined');
        return this.actor;
    }
    async _create(canisterId, idlFactory, options) {
        this.canisterId = canisterId;
        this.idlFactory = idlFactory;
        this.agent = await this.createAgent(options?.agentType ?? 'anonymous', options?.agentOptions);
        this.actor = agent_1.Actor.createActor(idlFactory, {
            agent: this.agent,
            canisterId,
            ...options?.actorOptions,
        });
        return this;
    }
    async createAgent(type, options) {
        let agent;
        if ('anonymous' === type) {
            agent = await this.createAnonymousAgent(options);
        }
        else if ('identity' === type) {
            agent = await this.createInternetIdentityAgent(options);
        }
        else if ('plug' === type) {
            // @ts-ignore
            agent = await this.createPlugAgent(options);
        }
        else {
            throw new Error(`unimplemented agent type: ${type}`);
        }
        if (!options?.production) {
            try {
                await agent.fetchRootKey();
            }
            catch (e) {
                console.warn('Unable to fetch root key. Check to ensure that your local replica is running');
                throw e;
            }
        }
        return agent;
    }
    async createAnonymousAgent(options) {
        return new agent_1.HttpAgent(options);
    }
    async createInternetIdentityAgent(options) {
        const client = await auth_client_1.AuthClient.create();
        const identity = await new Promise((resolve, reject) => {
            client.login({
                identityProvider: options?.host,
                onSuccess: () => resolve(client.getIdentity()),
                onError: (err) => reject(new Error(err)),
            });
        });
        return new agent_1.HttpAgent({ identity, ...options });
    }
    async createPlugAgent(options) {
        if (window.ic?.plug === undefined) {
            throw new Error('plug extension is not installed');
        }
        const { plug } = window.ic;
        await plug.requestConnect({ ...options, timeout: 60000 });
        await plug.isConnected();
        if (!(await plug.createAgent(options))) {
            throw new Error('create plug agent failed');
        }
        return plug.agent;
    }
}
exports.BaseActor = BaseActor;
