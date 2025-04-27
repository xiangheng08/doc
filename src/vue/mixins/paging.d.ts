export interface Pager {
  page_no: number
  page_size: number
  loading: boolean
  count: number
  list: any[]
  extra: Record<string, any>
  more: boolean
  finished: boolean
  getList: () => Promise<void>
  resetPage: () => void
  resetParams: () => void
  resetPager: () => void
  refresh: () => void
}

export interface PagingOptions {
  page_no?: number
  page_size?: number
  fetchFu: (params: Record<string, any>) => Promise<any>
  append?: boolean
  initialLoading?: boolean
  initialFetch?: boolean
  filterValues?: any[]
  filterFn?: (
    params: Record<string, any>,
    context: any,
  ) => Record<string, any>
  paramsKey?: string
  getResponseList?: (res: any) => any[]
  getResponseCount?: (res: any) => number
  getResponseExtra?: (res: any) => Record<string, any>
  fieldMap?: {
    page_no?: string
    page_size?: string
  }
}

declare function pagingMixin(options: PagingOptions): {
  data(): { pager: Pager }
}
