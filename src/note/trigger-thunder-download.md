# 触发迅雷下载

<script setup>
  import { onMounted } from 'vue';
  import { withBase } from 'vitepress';
  import { convertThunderDownload } from './convert-thunder-download.js';
  
  const url = globalThis?.location?.origin + withBase('/logo.svg');

  onMounted(()=>convertThunderDownload());
</script>

<a :href="url" download>普通下载</a>

<a :href="url" download data-thunder>迅雷下载</a>

想要触发迅雷下载只需要把下载地址转换为迅雷下载地址即可，转换方法如下：

```js
/* 
  在下载地址前面加上 'AA'，后面加上 'ZZ'，
  然后使用 btoa() 方法进行转换为 base64 编码
*/
const base64 = btoa('AA' + 'https://www.baidu.com' + 'ZZ');

console.log(base64); // QUFodHRwczovL3d3dy5iYWlkdS5jb21aWg==

// 使用 thunder:// 协议前缀，然后把 base64 编码后的地址拼接到协议后面就行了
const url = 'thunder://' + base64;

console.log(url); // thunder://QUFodHRwczovL3d3dy5iYWlkdS5jb21aWg==
```

thunder 协议是迅雷公司自己定义的协议。

批量修改

<<< ./convert-thunder-download.js

```html
<!-- 在标签加上 data-thunder 属性 -->
<a href="https://www.baidu.com" download data-thunder>迅雷下载</a>
```
