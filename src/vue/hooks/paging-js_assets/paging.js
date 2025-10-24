/**
 * usePaging 分页钩子函数
 * 依赖于 lodash-es 的 cloneDeep 方法
 */
import { cloneDeep } from 'lodash-es'
import { reactive, isRef, isProxy, toRaw } from 'vue'

export const usePaging = (options) => {
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
  } = options

  // 分页数据
  const pager = reactive({
    page_no,
    page_size,
    loading: initialLoading,
    count: 0,
    list: [],
    extra: {},
    more: true,
    finished: false,
  })

  // 记录初始参数
  const initParams = Object.freeze(cloneDeep(getRaw(params)))
  // 记录初始 pager
  const initPager = Object.freeze(cloneDeep(pager))

  let setLastOutdate = () => {}

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
      .then((res) => {
        if (outdated) return res

        // 更新分页数据
        pager.count = res?.count
        pager.extra = res?.extra
        pager.more = pager.page_no * pager.page_size < pager.count
        pager.finished = !pager.more

        // 处理数据追加逻辑
        if (append) {
          pager.list.push(...res?.list)
        } else {
          pager.list = res?.list
        }
        return res
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
    if (isRef(params)) {
      params.value = cloneDeep(initParams)
    } else {
      // 清空 params
      for (const key in params) {
        delete params[key]
      }
      Object.assign(params, cloneDeep(initParams))
    }
  }

  /**
   * 重置 pager
   */
  const resetPager = () => {
    Object.assign(pager, cloneDeep(initPager))
  }

  /**
   * 刷新（重置分页器并重新请求）
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

/**
 * 获取原始数据（辅助函数）
 */
const getRaw = (value) => {
  if (isRef(value)) {
    if (isProxy(value.value)) {
      return toRaw(value.value)
    }
    return value.value
  } else if (isProxy(value)) {
    return toRaw(value)
  } else {
    return value
  }
}

/**
 * 过滤参数（辅助函数）
 */
const filterParams = (params, values = []) => {
  const _params = { ...params }
  for (const key in _params) {
    if (values.includes(_params[key])) {
      delete _params[key]
    }
  }
  return _params
}
