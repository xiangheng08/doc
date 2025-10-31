import { createExpirablePromise } from './code'

/**
 * 模拟一个 API 请求
 */
const getListAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([1, 2, 3])
    }, Math.random() * 1000)
  })
}

// 通过 createExpirablePromise 创建一个可过期的 Promise
const expirableFetch = createExpirablePromise(getListAPI)

// 请求分页函数
const getList = async () => {
  const { result, expired } = await expirableFetch()
  // 如果过期了，则不处理
  if (expired) return
  console.log(result)
}
