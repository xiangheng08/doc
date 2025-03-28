/*
  usePaging 依赖于 lodash-es 的 cloneDeep 方法
*/
// @ts-ignore 这里我并没有下载 lodash-es 所以用 @ts-ignore 去除警告，真实代码需去除这行
import { cloneDeep } from 'lodash-es'
import { reactive, isRef, isProxy, toRaw } from 'vue'
import type { Reactive, Ref } from 'vue'

export type PagingParams = {
  page_no?: number
  page_size?: number
}

export type Params = Record<string, any>

export interface Pager<
  Item = any,
  Extra extends Record<string, any> = {},
> {
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

export interface PagingOptions {
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
  fetchFu: (params: Params) => Promise<any>
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
}

export const usePaging = <
  Item = any,
  Extra extends Record<string, any> = {},
>({
  page_no = 1,
  page_size = 15,
  fetchFu,
  params = {},
  append = false,
  initialLoading = false,
  initialFetch = false,
  filterValues = [void 0],
  filterFn = (p) => p,
}: PagingOptions) => {
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
  const initParams: Params = Object.freeze(cloneDeep(getRaw(params)))
  // 记录初始 pager
  const initPager = Object.freeze(cloneDeep(pager))

  let setLastOutdate: () => void = () => {}

  // 请求分页接口
  const getList = async () => {
    setLastOutdate()
    let outdated = false
    setLastOutdate = () => {
      outdated = true
    }

    pager.loading = true

    return fetchFu({
      page_no: pager.page_no,
      page_size: pager.page_size,
      ...filterFn(filterParams(params, filterValues)),
    })
      .then((res: any) => {
        if (outdated) {
          // 保证数据是最新的，如果请求已经过期，则不处理返回数据
          return Promise.resolve(res)
        }

        pager.count = res?.count
        pager.extra = res?.extra
        pager.more = pager.page_no * pager.page_size < pager.count
        pager.finished = !pager.more

        if (append) {
          pager.list.push(...res?.list)
        } else {
          pager.list = res?.list
        }
        return Promise.resolve(res)
      })
      .finally(() => {
        pager.loading = false
      })
  }
  /**
   * 重置页码
   */
  const resetPage = () => {
    pager.page_no = initPager.page_no
    getList()
  }
  /**
   * 重置参数
   */
  const resetParams = () => {
    Object.assign(params, cloneDeep(initParams))
    getList()
  }
  /**
   * 重置 pager
   */
  const resetPager = () => {
    Object.assign(pager, cloneDeep(initPager))
  }
  /**
   * 刷新
   */
  const refresh = () => {
    resetPager()
    getList()
  }

  if (initialFetch) {
    getList()
  }

  return {
    pager,
    getList,
    resetPage,
    resetParams,
    resetPager,
    refresh,
  }
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
