;(function () {
  const url = new URL(location.href)

  const setAppearance = (appearance) => {
    document.documentElement.style.colorScheme = appearance
    if (appearance === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }

  if (url.searchParams.has('appearance')) {
    setAppearance(url.searchParams.get('appearance'))
    // 去除 URL 参数
    url.searchParams.delete('appearance')
    history.replaceState(null, null, url.toString())
  } else {
    // 根据系统主题设置
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setAppearance('dark')
    } else {
      setAppearance('light')
    }
  }

  window.addEventListener('message', (event) => {
    if (
      typeof event.data === 'object' &&
      event.data !== null &&
      event.data.type === 'appearance'
    ) {
      setAppearance(event.data.value)
    }
  })
})()
