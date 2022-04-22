"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActor = void 0;
const agent_1 = require("@dfinity/agent");
const createActor = async (canisterId, idlFactory, options = { production: false }) => {
    const agent = new agent_1.HttpAgent({ ...options?.agentOptions });
    if (!options.production) {
        try {
            await agent.fetchRootKey();
        }
        catch (e) {
            console.warn('Unable to fetch root key. Check to ensure that your local replica is running');
            throw e;
        }
    }
    return Promise.resolve(agent_1.Actor.createActor(idlFactory, {
        agent,
        canisterId, ...options?.actorOptions,
    }));
};
exports.createActor = createActor;
