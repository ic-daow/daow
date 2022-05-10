import { ActorConfig, ActorSubclass, Agent, HttpAgentOptions } from '@dfinity/agent';
import { CreateAgentParams } from '@psychedelic/plug-inpage-provider/src/utils/agent';
import { IDL } from '@dfinity/candid';
export declare type IAgentType = 'identity' | 'plug' | 'anonymous';
export declare type ICreateActorOptions = {
    agentType?: IAgentType;
    agentOptions?: Partial<HttpAgentOptions & CreateAgentParams & {
        production?: boolean;
    }>;
    actorOptions?: Partial<ActorConfig>;
};
export declare class BaseActor<T> {
    private canisterId?;
    private idlFactory?;
    private agent?;
    private actor?;
    /**
     * canister id
     */
    getCanisterId(): string;
    /**
     * idlFactory
     */
    getIdlFactory(): IDL.InterfaceFactory;
    /**
     * agent
     */
    getAgent(): Agent;
    /**
     * actor
     */
    getActor(): NonNullable<ActorSubclass<T>>;
    protected _create(canisterId: string, idlFactory: IDL.InterfaceFactory, options?: ICreateActorOptions): Promise<this>;
    private createAgent;
    private createAnonymousAgent;
    private createInternetIdentityAgent;
    private createPlugAgent;
}
