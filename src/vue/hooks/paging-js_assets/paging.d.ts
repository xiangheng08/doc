/**
 * 分页基础参数类型
 */
export type PagingParams = {
  /** 当前页码 */
  page_no?: number
  /** 每页数量 */
  page_size?: number
}

export type Params = Record<string, any>

/**
 * 分页器数据结构
 */
export interface Pager<
  Item = any,
  Extra extends Record<string, any> = {},
> {
  /** 当前页码 */
  page_no: number
  /** 每页数量 */
  page_size: number
  /** 是否加载中 */
  loading: boolean
  /** 数据总数 */
  count: number
  /** 数据列表 */
  list: Item[]
  /** 额外数据 */
  extra: Extra
  /** 是否还有更多 */
  more: boolean
  /** 是否已经完成（对 more 的取反） */
  finished: boolean
}

/**
 * 分页钩子配置项
 */
export interface PagingOptions {
  /** 初始页数（默认1） */
  page_no?: number
  /** 初始每页数量（默认15） */
  page_size?: number
  /** 请求方法 */
  fetchFu: (params: Params) => Promise<any>
  /** 请求参数 */
  params?: Params
  /** 是否为追加模式（默认false） */
  append?: boolean
  /** 是否初始加载状态（默认false） */
  initialLoading?: boolean
  /** 是否立即执行初始请求（默认false） */
  initialFetch?: boolean
  /** 需要过滤的参数值（默认[undefined]） */
  filterValues?: any[]
  /** 自定义参数过滤函数 */
  filterFn?: (params: Params) => Params
}

/**
 * Vue分页钩子函数
 */
export declare const usePaging: <
  Item = any,
  Extra extends Record<string, any> = {},
>(
  options: PagingOptions,
) => {
  /** 分页器实例 */
  pager: Pager<Item, Extra>
  /** 执行分页请求 */
  getList: () => Promise<any>
  /** 重置页码 */
  resetPage: () => void
  /** 重置参数 */
  resetParams: () => void
  /** 重置分页器 */
  resetPager: () => void
  /** 刷新（重置并请求） */
  refresh: () => void
}
