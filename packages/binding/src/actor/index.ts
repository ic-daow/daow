import {
  Actor,
  ActorConfig,
  ActorSubclass,
  Agent,
  HttpAgent,
  HttpAgentOptions,
  Identity,
} from '@dfinity/agent'
import { AuthClient } from '@dfinity/auth-client'
import { CreateAgentParams } from '@psychedelic/plug-inpage-provider/src/utils/agent'
import { IDL } from '@dfinity/candid'
import assert from 'assert'

export type IAgentType = 'identity' | 'plug' | 'anonymous'

export type ICreateActorOptions = {
  agentType?: IAgentType
  agentOptions?: Partial<HttpAgentOptions & CreateAgentParams & { production?: boolean }>
  actorOptions?: Partial<ActorConfig>
}

export class BaseActor<T> {
  private canisterId?: string
  private idlFactory?: IDL.InterfaceFactory
  private agent?: Agent
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

  protected async _create(
    canisterId: string,
    idlFactory: IDL.InterfaceFactory,
    options?: ICreateActorOptions,
  ) {
    this.canisterId = canisterId
    this.idlFactory = idlFactory
    this.agent = await this.createAgent(options?.agentType ?? 'anonymous', options?.agentOptions)
    this.actor = Actor.createActor<T>(idlFactory, {
      agent: this.agent,
      canisterId,
      ...options?.actorOptions,
    })
    return this
  }

  private async createAgent(type: IAgentType, options: ICreateActorOptions['agentOptions']) {
    let agent: Agent
    if ('anonymous' === type) {
      agent = await this.createAnonymousAgent(options)
    } else if ('identity' === type) {
      agent = await this.createInternetIdentityAgent(options)
    } else if ('plug' === type) {
      // @ts-ignore
      agent = await this.createPlugAgent(options)
    } else {
      throw new Error(`unimplemented agent type: ${type}`)
    }
    if (!options?.production) {
      try {
        await agent.fetchRootKey()
      } catch (e) {
        console.warn('Unable to fetch root key. Check to ensure that your local replica is running')
        throw e
      }
    }
    return agent
  }

  private async createAnonymousAgent(options: ICreateActorOptions['agentOptions']) {
    return new HttpAgent(options)
  }

  private async createInternetIdentityAgent(options: ICreateActorOptions['agentOptions']) {
    const client = await AuthClient.create()
    const identity = await new Promise<Identity>((resolve, reject) => {
      client.login({
        identityProvider: options?.host,
        onSuccess: () => resolve(client.getIdentity()),
        onError: (err) => reject(new Error(err)),
      })
    })
    return new HttpAgent({ identity, ...options })
  }

  private async createPlugAgent(options: ICreateActorOptions['agentOptions']) {
    if (window.ic?.plug === undefined) {
      throw new Error('plug extension is not installed')
    }
    const { plug } = window.ic
    await plug.requestConnect({ ...options, timeout: 60000 })
    await plug.isConnected()
    if (!(await plug.createAgent(options))) {
      throw new Error('create plug agent failed')
    }
    return plug.agent!!
  }
}
