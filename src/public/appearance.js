;(function () {
  const url = new URL(location.href)

  if (url.searchParams.has('appearance')) {
    document.documentElement.style.colorScheme =
      url.searchParams.get('appearance')
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
