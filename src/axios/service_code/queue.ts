import { Canceler } from 'axios'
import { RequestConfig, RequestQueueConfig } from './types'

export class RequestQueue {
  private readonly config: RequestQueueConfig
  private readonly queue: Array<RequestConfig> = []

  constructor(config: RequestQueueConfig) {
    this.config = config
  }

  add(config: RequestConfig): Promise<any> {

  }
}

export interface PendingRequest {
  priority: number
  cancel: Canceler

}
