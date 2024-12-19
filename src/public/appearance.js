;(function () {
  const url = new URL(location.href)

  if (url.searchParams.has('appearance')) {
    document.documentElement.style.colorScheme =
      url.searchParams.get('appearance')
  } else {
    // 根据系统主题设置
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.style.colorScheme = 'dark'
    } else {
      document.documentElement.style.colorScheme = 'light'
    }
  }

  window.addEventListener('message', (event) => {
    if (
      typeof event.data === 'object' &&
      event.data !== null &&
      event.data.type === 'appearance'
    ) {
      document.documentElement.style.colorScheme = event.data.value
    }
  })
})()
