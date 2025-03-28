// request.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  // @ts-ignore 真实代码忽略去除这行
} from 'axios'

// 创建 Axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // 从环境变量中获取 API 基础 URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 在发送请求之前做些什么，例如添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做些什么
    return response.data
  },
  (error: AxiosError) => {
    // 对响应错误做些什么
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 处理未授权的情况
          break
        case 404:
          // 处理未找到资源的情况
          break
        default:
          // 处理其他错误
          break
      }
    }
    return Promise.reject(error)
  },
)

// 导出封装的 Axios 实例
export default instance
