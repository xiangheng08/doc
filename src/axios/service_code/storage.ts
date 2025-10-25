import { deepClone } from './utils'

export interface RequestCacheStorageConfig {
  expireTime: number
}

export interface RequestCacheStorageItem {
  value: any
  expireTime: number
}

export interface RequestCacheStorage {
  readonly expireTime: number
  get(key: string): any
  set(key: string, value: any): void
  remove(key: string): void
  clear(): void
}

export class MemoryStorage implements RequestCacheStorage {
  readonly expireTime: number
  private storage: Record<string, RequestCacheStorageItem> = {}

  constructor(config: RequestCacheStorageConfig) {
    this.expireTime = config.expireTime
  }

  get(key: string) {
    const item = this.storage[key]
    if (!item) return null
    if (Date.now() > item?.expireTime) {
      this.remove(key)
      return null
    }
    return deepClone(item.value)
  }

  set(key: string, value: any) {
    this.storage[key] = {
      value: deepClone(value),
      expireTime: Date.now() + this.expireTime,
    }
  }

  remove(key: string) {
    delete this.storage[key]
  }

  clear(): void {
    this.storage = {}
  }
}

export class SessionStorage implements RequestCacheStorage {
  readonly expireTime: number

  constructor(config: RequestCacheStorageConfig) {
    this.expireTime = config.expireTime
  }

  get(key: string): any {
    try {
      const itemStr = sessionStorage.getItem(key)
      if (!itemStr) return null

      const item: RequestCacheStorageItem = JSON.parse(itemStr)
      if (Date.now() > item.expireTime) {
        this.remove(key)
        return null
      }

      return item.value
    } catch (e) {
      return null
    }
  }

  set(key: string, value: any): void {
    const item: RequestCacheStorageItem = {
      value,
      expireTime: Date.now() + this.expireTime,
    }
    sessionStorage.setItem(key, JSON.stringify(item))
  }

  remove(key: string): void {
    sessionStorage.removeItem(key)
  }

  clear(): void {
    sessionStorage.clear()
  }
}

export class LocalStorage implements RequestCacheStorage {
  readonly expireTime: number

  constructor(config: RequestCacheStorageConfig) {
    this.expireTime = config.expireTime
  }

  get(key: string): any {
    try {
      const itemStr = localStorage.getItem(key)
      if (!itemStr) return null

      const item: RequestCacheStorageItem = JSON.parse(itemStr)
      if (Date.now() > item.expireTime) {
        this.remove(key)
        return null
      }

      return item.value
    } catch (e) {
      return null
    }
  }

  set(key: string, value: any): void {
    const item: RequestCacheStorageItem = {
      value,
      expireTime: Date.now() + this.expireTime,
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  remove(key: string): void {
    localStorage.removeItem(key)
  }

  clear(): void {
    localStorage.clear()
  }
}
