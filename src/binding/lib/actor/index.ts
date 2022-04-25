import { Actor, ActorConfig, ActorSubclass, HttpAgent, HttpAgentOptions } from '@dfinity/agent'
import { IDL } from '@dfinity/candid'
import assert from 'assert'

export type ICreateActorOptions = {
  production?: boolean;
  agentOptions?: Partial<HttpAgentOptions>;
  actorOptions?: Partial<ActorConfig>;
}

export class BaseActor<T> {
  private canisterId?: string
  private idlFactory?: IDL.InterfaceFactory
  private agent?: HttpAgent
  private actor?: ActorSubclass<T>

  /**
   * canister id
   */
  public getCanisterId() {
    assert(this.canisterId !== undefined, 'canisterId is not defined')
    return this.canisterId!
  }

  /**
   * idlFactory
   */
  public getIdlFactory() {
    assert(this.idlFactory !== undefined, 'idlFactory is not defined')
    return this.idlFactory!
  }

  /**
   * agent
   */
  public getAgent() {
    assert(this.agent !== undefined, 'agent is not defined')
    return this.agent!
  }

  /**
   * actor
   */
  public getActor() {
    assert(this.actor !== undefined, 'actor is not defined')
    return this.actor!
  }

  protected async _create(canisterId: string, idlFactory: IDL.InterfaceFactory, options: ICreateActorOptions = { production: false }) {
    this.canisterId = canisterId
    this.idlFactory = idlFactory

    this.agent = new HttpAgent({ ...options?.agentOptions })
    if (!options.production) {
      try {
        await this.agent.fetchRootKey()
      } catch (e) {
        console.warn('Unable to fetch root key. Check to ensure that your local replica is running')
        throw e
      }
    }

    this.actor = Actor.createActor<T>(idlFactory, {
      agent: this.agent,
      canisterId, ...options?.actorOptions,
    })

    return this
  }
}
