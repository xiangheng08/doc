/* eslint-disable */
// @ts-nocheck
export {}

/* prettier-ignore */
declare module 'vue' {
  export interface GlobalComponents {
    EmbedIframe: typeof import('./.vitepress/components/embed-iframe.vue')['default']
    Demo: typeof import('./.vitepress/components/demo.vue')['default']
    DemoIframe: typeof import('./.vitepress/components/demo-iframe.vue')['default']
    CssDemo: typeof import('./.vitepress/components/css-demo.vue')['default']
    CodeDemo: typeof import('./.vitepress/components/code-demo.vue')['default']
  }
}
