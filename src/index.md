---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: My doc
  text: 我的笔记
  tagline: 在这里，留下学习的痕迹
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: 关于本站
      link: /about

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

```js
console.log('Hello World!')
```

<script setup>
import { onMounted } from 'vue'
onMounted(() => console.log('Hello World!'))
</script>
