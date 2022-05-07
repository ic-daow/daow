import type Provider from '@psychedelic/plug-inpage-provider'

declare global {
  interface Window {
    ic?: {
      plug: Provider
    }
  }
}
