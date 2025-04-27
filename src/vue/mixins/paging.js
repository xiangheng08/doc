import { cloneDeep } from 'lodash-es'

export const pagingMixin = (options) => {
  if (typeof options !== 'object' || options === null) {
    throw new Error('options must be an object')
  }

  const {
    page_no = 1,
    page_size = 15,
    fetchFu,
    append = false,
    initialLoading = false,
    initialFetch = false,
    filterValues = [void 0],
    filterFn = (p) => p,
    paramsKey = 'queryParams',
    getResponseList = (res) => res?.list || [],
    getResponseCount = (res) => res?.count || 0,
    getResponseExtra = () => ({}),
  } = options

  let CONTEXT // 组件上下文
  let INIT_PARAMS // 初始参数
  let INIT_PAGER // 初始分页器数据

  const fieldMap = Object.assign(
    {
      page_no: 'pageNum',
      page_size: 'pageSize',
    },
    options.fieldMap || {},
  )

  const getParams = () => CONTEXT[paramsKey] || {}

  let setLastOutdate = () => {}

  // 请求分页接口
  const getList = async () => {
    setLastOutdate()
    let outdated = false
    setLastOutdate = () => {
      outdated = true
    }

    const pager = CONTEXT.pager

    pager.loading = true

    return fetchFu({
      [fieldMap.page_no]: pager.page_no,
      [fieldMap.page_size]: pager.page_size,
      ...filterFn(filterParams(getParams(), filterValues), CONTEXT),
    })
      .then((res) => {
        if (outdated) {
          // 保证数据是最新的，如果请求已经过期，则不处理返回数据
          return Promise.resolve(res)
        }

        pager.count = getResponseCount(res)
        pager.extra = getResponseExtra(res)
        pager.more = pager.page_no * pager.page_size < pager.count
        pager.finished = !pager.more

        if (append) {
          pager.list.push(...getResponseList(res))
        } else {
          pager.list = getResponseList(res)
        }

        return Promise.resolve(res)
      })
      .finally(() => {
        pager.loading = false
      })
  }
  // 重置页码并重新请求
  const resetPage = () => {
    CONTEXT.pager.page_no = INIT_PARAMS.page_no
    getList()
  }
  // 重置参数并重新请求
  const resetParams = () => {
    Object.assign(getParams(), cloneDeep(INIT_PARAMS))
    getList()
  }
  // 重置 pager
  const resetPager = () => {
    Object.assign(CONTEXT.pager, cloneDeep(INIT_PAGER))
  }
  // 刷新
  const refresh = () => {
    resetPager()
    getList()
  }

  return {
    data() {
      return {
        pager: {
          page_no,
          page_size,
          loading: initialLoading || false,
          count: 0,
          list: [],
          extra: {},
          more: true,
          finished: false,

          getList,
          resetPage,
          resetParams,
          resetPager,
          refresh,
        },
      }
    },
    created() {
      CONTEXT = this
      INIT_PARAMS = Object.freeze(cloneDeep(getParams()))
      INIT_PAGER = Object.freeze(cloneDeep(this.pager))

      if (initialFetch) {
        getList()
      }
    },
  }
}

export const filterParams = (params, values = []) => {
  const _params = Object.assign({}, params)
  // 过滤参数
  for (const key in _params) {
    if (values.includes(_params[key])) {
      delete _params[key]
    }
  }
  return _params
}
