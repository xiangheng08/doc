import { RequestService } from '.'
import type { RequestConfig } from '.'

export const service = new RequestService({
  retry: {
    maxCount: 2,
    delay: 500,
    timing: 'linear', // 'linear' | 'exponential'
    retryIf(error, count) {
      // 全局自定义重试条件
      console.log('global retry', error, count)
      return true
    },
    onRetry(error, count, delay) {
      console.log('global retry', error, count, delay)
    },
  },
  cache: {
    storage: 'memory', // 'memory' | 'session' | 'local'
    expireTime: 5 * 60 * 1000,
  },
  queue: {
    maxConcurrent: 5, // 最大并发数
  },
})

service.interceptors.request.use((config) => {
  console.log('request', config)

  if (config.withToken) {
    if (!config.headers) config.headers = {}
    config.headers['Authorization'] =
      'Bearer ' + localStorage.getItem('token')
  }

  return config
})

service.interceptors.response.use((response) => {
  console.log('response', response)

  const config = response.config as RequestConfig

  // 明确不处理 response 或 responseType 不是 json 时，直接返回 response
  if (!config.handleResponse || config.responseType !== 'json') {
    return response
  }

  const { code, msg, data } = response.data

  switch (code) {
    case 200:
      return data
    case 401:
      alert('未授权')
      // 处理未授权
      break
    default:
      // 处理其他错误
      alert(msg)
      break
  }

  return data
})

/**
 * 使用示例
 ********************************/

// 不带 token
service.get('/login', { withToken: false })

// 不处理 response
service.get('/api', { handleResponse: false })

// 启用缓存
service.get('/api', { cache: true })

// 设置优先级
service.get('/api', { priority: 9 })

// 阻止重复请求
// 取消新的请求
service.get('/api', { preventDuplicate: 'cancel-new' })
// 取消旧的请求
service.get('/api', { preventDuplicate: 'cancel-old' })
// 将新的请求链接到旧的请求，新的请求直接使用旧的请求的响应数据
service.get('/api', { preventDuplicate: 'link' })

// 请求重试
// 启用重试，如果配置了重试，则使用默认启用重试
service.get('/api', { retry: true })
// 禁用重试
service.get('/api', { retry: false })
// 启用重试，并设置重置配置
service.get('/api', {
  retry: {
    maxCount: 3,
    delay: 1000,
    timing: 'exponential',
    retryIf: (error) => error.code === 'ECONNABORTED',
    onRetry: (error, retryCount, delay) => {
      console.log('retry', retryCount, delay)
    },
  },
})
