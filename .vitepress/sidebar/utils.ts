import { DefaultTheme } from 'vitepress'

export default [
  { link: '/utils/debounce/' },
  { link: '/utils/throttle/' },
  { link: '/utils/throttle-and-debounce/' },
  { link: '/utils/get-error-message/' },
  { link: '/utils/perform-task/' },
  { link: '/utils/create-expirable-promise/' },
  { link: '/utils/has-decimal/' },
  { link: '/utils/random/' },
  {
    text: '字符串处理',
    items: [
      { link: '/utils/format-amount/' },
      { link: '/utils/format-bytes/' },
      { link: '/utils/format-duration/' },
      { link: '/utils/format-distance-time/' },
      { link: '/utils/add-thousands-separator/' },
    ],
  },
  {
    text: '颜色相关',
    items: [
      { link: '/utils/color-transform/' },
      { link: '/utils/random-color/' },
    ],
  },
  {
    text: '浏览器专属',
    items: [
      { link: '/utils/browser/select-file/' },
      { link: '/utils/browser/load-image/' },
      { link: '/utils/browser/get-image-average-color/' },
      { link: '/utils/browser/get-image-dimensions/' },
      { link: '/utils/browser/is-vector-image/' },
      { link: '/utils/browser/canvas-to-blob/' },
      { link: '/utils/browser/canvas-to-data-url/' },
      { link: '/utils/browser/blob-to-base64/' },
      { link: '/utils/browser/get-scroll-offset/' },
    ],
  },
  { link: '/utils/github/' },
  { link: '/utils/npm/' },
] satisfies DefaultTheme.Sidebar
