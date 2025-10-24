import {
  LocalStorage,
  MemoryStorage,
  RequestCacheStorage,
  SessionStorage,
} from './storage'
import { RequestCacheConfig } from './types'

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
}
