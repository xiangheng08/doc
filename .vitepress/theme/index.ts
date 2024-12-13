// https://vitepress.dev/guide/custom-theme
import './style.css'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import EmbedIframe from '../components/embed-iframe.vue'
import Demo from '../components/demo.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...

    /* 全局组件 */
    app.component('EmbedIframe', EmbedIframe)
    app.component('Demo', Demo)
  },
} satisfies Theme
