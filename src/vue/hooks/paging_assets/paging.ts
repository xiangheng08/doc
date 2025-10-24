/**
 * usePaging 分页钩子函数
 * 依赖于 lodash-es 的 cloneDeep 方法
 */
import { cloneDeep } from 'lodash-es'
import { reactive, isRef, isProxy, toRaw } from 'vue'
import type { Reactive, Ref } from 'vue'

export type PagingParams = {
  page_no?: number
  page_size?: number
}

export type Params = Record<string, any>

export type ExtraType = Record<string, any>

export interface Pager<Item = any, Extra extends ExtraType = {}> {
  /**
   * 当前页码
   */
  page_no: number
  /**
   * 每页数量
   */
  page_size: number
  /**
   * 是否加载中
   */
  loading: boolean
  /**
   * 数据总数
   */
  count: number
  /**
   * 数据列表
   */
  list: Item[]
  /**
   * 额外数据
   */
  extra: Extra
  /**
   * 是否还有更多
   */
  more: boolean
  /**
   * 是否已经完成（对 pager.more 的取反），适用于上拉加载等场景
   */
  finished: boolean
}

export interface PagingOptions<T = any> {
  /**
   * 初始页数
   */
  page_no?: number
  /**
   * 初始每页数量
   */
  page_size?: number
  /**
   * 请求方法
   */
  fetchFu: (params: Params) => Promise<T>
  /**
   * 请求参数
   */
  params?: Params
  /**
   * 是否为追加模式
   */
  append?: boolean
  /**
   * pager.loading 是否默认为 true
   */
  initialLoading?: boolean
  /**
   * 是否在组件实例化时请求
   */
  initialFetch?: boolean
  /**
   * 过滤参数，例如：[void 0] 当请求参数为 undefined 时，则过滤掉这个参数
   */
  filterValues?: any[]
  /**
   * 自定义参数过滤函数
   */
  filterFn?: (params: Params) => Params
  /**
   * 自定义获取列表数据的方法
   */
  fetchList?: (res: T) => any[]
  /**
   * 自定义获取列表数据的总数方法
   */
  fetchCount?: (res: T) => number
  /**
   * 自定义获取列表数据的额外数据方法
   */
  fetchExtra?: (res: T) => any
}

export const usePaging = <
  T = any,
  Item = any,
  Extra extends ExtraType = {},
>(
  options: PagingOptions<T>,
) => {
  const {
    page_no = 1,
    page_size = 15,
    fetchFu,
    params = {},
    append = false,
    initialLoading = false,
    initialFetch = false,
    filterValues = [void 0],
    filterFn = (p) => p,
    fetchList = (res: any) => res.list || [],
    fetchCount = (res: any) => res.count || 0,
    fetchExtra = (res: any) => res.extra || {},
  } = options

  // 分页数据
  const pager = reactive<Pager<Item, Extra>>({
    page_no,
    page_size,
    loading: initialLoading,
    count: 0,
    list: [],
    extra: {} as Extra,
    more: true,
    finished: false,
  })

  // 记录初始参数
  const __params: Params = Object.freeze(cloneDeep(getRaw(params)))
  // 记录初始 pager
  const _pager = Object.freeze(cloneDeep(pager))

  let setLastOutdate: (() => void) | undefined

  /** 请求分页接口 */
  const getList = async () => {
    setLastOutdate?.()
    let outdated = false
    setLastOutdate = () => {
      outdated = true
      setLastOutdate = void 0
    }

    pager.loading = true

    try {
      const res = await fetchFu({
        page_no: pager.page_no,
        page_size: pager.page_size,
        ...filterFn(filterParams(params, filterValues)),
      })

      // 保证数据是最新的，如果请求已经过期，则不处理返回数据
      if (outdated) return

      const list = fetchList(res)
      const count = fetchCount(res)
      const extra = fetchExtra(res)

      pager.count = count
      pager.extra = extra
      pager.more = pager.page_no * pager.page_size < pager.count
      pager.finished = !pager.more

      if (append) {
        pager.list.push(...list)
      } else {
        pager.list = list
      }
    } catch (error) {
      throw error
    } finally {
      pager.loading = false
    }
  }
  /** 重置页码 */
  const resetPage = () => {
    pager.page_no = _pager.page_no
    getList()
  }
  /** 重置参数 */
  const resetParams = () => {
    if (isRef(params)) {
      params.value = cloneDeep(__params)
    } else {
      // 清空 params
      for (const key in params) {
        delete params[key]
      }
      Object.assign(params, cloneDeep(__params))
    }
    getList()
  }
  /** 重置 pager */
  const resetPager = () => {
    Object.assign(pager, cloneDeep(_pager))
    getList()
  }

  if (initialFetch) {
    getList()
  }

  return { pager, getList, resetPage, resetParams, resetPager }
}

// 获取原始数据（辅助函数）
const getRaw = <T>(value: Ref<T> | Reactive<T> | T): T => {
  if (isRef(value)) {
    if (isProxy(value.value)) {
      return toRaw(value.value) as T
    }
    return value.value as T
  } else if (isProxy(value)) {
    return toRaw(value) as T
  } else {
    return value as T
  }
}

// 过滤参数（辅助函数）
const filterParams = (params: Params, values: any[] = []) => {
  const _params = Object.assign({}, params)
  // 过滤参数
  for (const key in _params) {
    if (values.includes(_params[key])) {
      delete _params[key]
    }
  }
  return _params
}
