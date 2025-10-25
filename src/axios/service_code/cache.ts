import {
  LocalStorage,
  MemoryStorage,
  RequestCacheStorage,
  SessionStorage,
} from './storage'
import { RequestCacheConfig, RequestConfig } from './types'

export class RequestCacher {
  readonly storage: RequestCacheStorage
  constructor(config: RequestCacheConfig = {}) {
    const { storage, expireTime = 5 * 60 * 1000 } = config

    switch (storage) {
      case 'memory':
        this.storage = new MemoryStorage({ expireTime })
        break
      case 'session':
        this.storage = new SessionStorage({ expireTime })
        break
      case 'local':
        this.storage = new LocalStorage({ expireTime })
        break
      default:
        this.storage = new MemoryStorage({ expireTime })
    }
  }

  get(id: string) {
    return this.storage.get(id)
  }

  remove(id: string) {
    this.storage.remove(id)
  }

  set(id: string, value: any) {
    this.storage.set(id, value)
  }

  clear() {
    this.storage.clear()
  }

  cache(id: string, config: RequestConfig, response: any) {
    if (config.cache) {
      this.set(id, response)
    }
  }
}
