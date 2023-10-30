# CSS 效果

## 平滑滚动
```css
/* 根元素 */
html {
  scroll-behavior: smooth;
}
/* 指定元素 */
.scroll-container {
  scroll-behavior: smooth;
}
```

<script setup>
import subPage from '@theme/components/subPage.vue'
</script>

<sub-page url="/examples/iframe/css/smoothScroll.html" height="360" title="效果"/>

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-behavior)