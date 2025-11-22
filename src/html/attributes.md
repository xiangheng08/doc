# 有用的 HTML 属性详解

在这篇文档中，我们将介绍一些实用但不太为人所知的 HTML 属性，这些属性可以帮助你更好地控制网页元素的行为和用户体验。

## inputmode

指定输入元素的虚拟键盘类型，帮助移动用户更容易地输入特定类型的数据。这个属性是一个枚举值，提供了用户在编辑元素或其内容时可能输入的数据类型的提示。

```html
<!-- none: 无虚拟键盘，适用于需要实现自己的键盘输入控件时 -->
<input type="text" inputmode="none" placeholder="自定义输入控件">

<!-- text: 标准文本输入键盘（默认值） -->
<input type="text" inputmode="text" placeholder="标准文本输入">

<!-- decimal: 小数输入键盘，包含数字和分隔符 -->
<input type="text" inputmode="decimal" placeholder="输入小数，如 3.14">

<!-- numeric: 数字输入键盘，只包含 0-9 的数字 -->
<input type="text" inputmode="numeric" placeholder="请输入整数">

<!-- tel: 电话输入键盘，包含数字、* 和 # -->
<input type="text" inputmode="tel" placeholder="输入电话号码">

<!-- search: 搜索输入优化的虚拟键盘 -->
<input type="text" inputmode="search" placeholder="输入搜索关键词">

<!-- email: 邮件地址输入优化的虚拟键盘 -->
<input type="text" inputmode="email" placeholder="请输入邮箱地址">

<!-- url: 网址输入优化的虚拟键盘 -->
<input type="text" inputmode="url" placeholder="请输入网址">
```

## poster

为视频元素设置封面图像，在视频加载前或播放前显示。

```html
<video controls width="400" height="300" poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4">
  您的浏览器不支持视频标签。
</video>
```

## multiple

允许用户选择多个值，可用于 email 和 file 类型的输入框，以及 select 元素。

```html
<!-- 多文件上传 -->
<input type="file" multiple>

<!-- 多邮箱输入 -->
<input type="email" multiple placeholder="输入多个邮箱，用逗号分隔">

<!-- 多选项选择 -->
<select multiple>
  <option value="apple">苹果</option>
  <option value="banana">香蕉</option>
  <option value="orange">橙子</option>
  <option value="grape">葡萄</option>
</select>
```

## accesskey

定义访问元素的快捷键，与修饰键（如 Alt）组合使用。激活 accesskey 的操作取决于浏览器及其平台。

```html
<!-- 使用 Alt + S 聚焦到搜索框 -->
<input type="search" accesskey="s" placeholder="搜索..." aria-label="搜索">

<!-- 使用 Alt + H 跳转到主页 -->
<a href="/" accesskey="h">首页</a>
```

不同浏览器和操作系统下 accesskey 的激活方式：

<table class="standard-table">
  <tbody>
    <tr>
      <th></th>
      <th>Windows</th>
      <th>Linux</th>
      <th>Mac</th>
    </tr>
    <tr>
      <th>Firefox</th>
      <td colspan="2" rowspan="1" style="text-align: center">
        <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd><em>key</em></kbd>
      </td>
      <td>
        On Firefox 57 or newer, <kbd>Control</kbd> + <kbd>Option</kbd> +
        <kbd><em>key</em></kbd> -OR- <kbd>Control</kbd> + <kbd>Alt</kbd> +
        <kbd><em>key</em></kbd><br>On Firefox 14 or newer, <kbd>Control</kbd> + <kbd>Alt</kbd> +
        <kbd><em>key</em></kbd><br>On Firefox 13 or older, <kbd>Control</kbd> +
        <kbd><em>key</em></kbd>
      </td>
    </tr>
    <tr>
      <th>Internet Explorer</th>
      <td>
        <kbd>Alt</kbd> + <kbd><em>key</em></kbd>
      </td>
      <td colspan="2" rowspan="1">N/A</td>
    </tr>
    <tr>
      <th>Google Chrome</th>
      <td colspan="2" rowspan="1" style="text-align: center">
        <kbd>Alt</kbd> + <kbd><em>key</em></kbd>
      </td>
      <td>
        <kbd>Control</kbd> + <kbd>Alt</kbd> + <kbd><em>key</em></kbd>
      </td>
    </tr>
    <tr>
      <th>Safari</th>
      <td>
        <kbd>Alt</kbd> + <kbd><em>key</em></kbd>
      </td>
      <td>N/A</td>
      <td>
        <kbd>Control</kbd> + <kbd>Alt</kbd> + <kbd><em>key</em></kbd>
      </td>
    </tr>
    <tr>
      <th>Opera 15+</th>
      <td colspan="2" rowspan="1" style="text-align: center">
        <kbd>Alt</kbd> + <kbd><em>key</em></kbd>
      </td>
      <td>
        <kbd>Control</kbd> + <kbd>Alt</kbd> + <kbd><em>key</em></kbd>
      </td>
    </tr>
    <tr>
      <th>Opera 12</th>
      <td colspan="3" rowspan="1">
        <p>
          <kbd>Shift</kbd> + <kbd>Esc</kbd> opens a contents list which are
          accessible by accesskey, then, can choose an item by pressing
          <kbd><em>key</em></kbd>
        </p>
      </td>
    </tr>
  </tbody>
</table>

注意事项：
1. Firefox 可以通过用户偏好自定义所需的修饰键
2. accesskey 值可能与系统或浏览器键盘快捷键冲突
3. 某些 accesskey 值可能不会出现在某些键盘上
4. 依赖数字的 accesskey 值可能会让有认知问题的用户感到困惑
5. 需要适当通知用户 accesskey 的存在

## tabindex

指定元素的 Tab 键焦点顺序，也可让非可聚焦元素获得焦点。

```html
<!-- 按顺序获得焦点：1 -> 2 -> 3 -->
<input type="text" tabindex="1" placeholder="第一个输入框">
<button tabindex="3">第三个按钮</button>
<input type="text" tabindex="2" placeholder="第二个输入框">

<!-- 负值使元素可以通过编程方式获得焦点，但不在Tab序列中 -->
<div tabindex="-1" id="info">信息面板</div>

<!-- 使普通元素可聚焦 -->
<p tabindex="0">这个段落可以获得焦点</p>
```

## download

指示链接应下载而不是导航到目标资源，可以指定下载文件的名称。

```html
<!-- 下载同源文件 -->
<a href="document.pdf" download>下载PDF文档</a>

<!-- 指定下载文件名 -->
<a href="report.pdf" download="年度报告.pdf">下载年度报告</a>

<!-- 下载动态生成的内容 -->
<a href="/api/generate-report" download="报表.xlsx">下载Excel报表</a>
```

## dir

指定元素中文本的方向，用于支持从右到左的语言。

```html
<!-- 从左到右（默认） -->
<p dir="ltr">This text flows left to right.</p>

<!-- 从右到左 -->
<p dir="rtl">هذا النص يتدفق من اليمين إلى اليسار.</p>

<!-- 自动检测方向 -->
<p dir="auto">Mixed content: من اليمين إلى اليسار and left to right.</p>
```

## spellcheck

控制元素是否启用拼写检查。

```html
<!-- 禁用拼写检查（适用于代码编辑器） -->
<textarea spellcheck="false" placeholder="在此处输入代码...">
function helloWorld() {
  console.log("Hello, world!");
}
</textarea>

<!-- 启用拼写检查（默认对于文本输入框） -->
<textarea spellcheck="true" placeholder="在此处输入文本..."></textarea>

<!-- 对于姓名输入禁用拼写检查 -->
<input type="text" spellcheck="false" placeholder="输入您的姓名">
```

## translate

指定元素的内容是否应该被翻译。

```html
<!-- 不翻译用户名 -->
<span translate="no">JohnDoe</span>

<!-- 不翻译品牌名称 -->
<footer>
  <p>© 2023 <span translate="no">TechCorp</span>. All rights reserved.</p>
</footer>

<!-- 不翻译代码片段 -->
<code translate="no">console.log("Hello World");</code>
```

## contenteditable

使元素内容可编辑，用户可以直接在页面上修改元素的内容。

```html
<!-- 启用内容编辑 -->
<div contenteditable="true">这个文本可以被编辑</div>

<!-- 明确禁用内容编辑 -->
<p contenteditable="false">这个文本不能被编辑</p>
```

## hidden

控制元素是否显示，设置此属性会使元素完全从渲染中移除。

```html
<!-- 隐藏元素 -->
<div hidden>这个元素不会显示</div>

<!-- 条件性隐藏 -->
<p id="message" hidden>操作成功！</p>
```

## draggable

指定元素是否可以被拖拽，常用于实现拖放功能。

```html
<!-- 允许元素被拖拽 -->
<div draggable="true">拖拽我</div>

<!-- 禁止拖拽（默认） -->
<span draggable="false">不能拖拽</span>
```

## loading

控制图片或 iframe 的加载行为，可用于实现懒加载。

```html
<!-- 懒加载图片 -->
<img src="large-image.jpg" loading="lazy" alt="大图片">

<!-- 立即加载（默认行为） -->
<img src="critical-image.jpg" loading="eager" alt="重要图片">

<!-- 浏览器自动决定（默认） -->
<iframe src="page.html" loading="auto"></iframe>
```

## decoding

控制图片的解码方式，影响图片加载时的性能表现。

```html
<!-- 异步解码，不会阻塞其他内容渲染 -->
<img src="image.jpg" decoding="async" alt="异步解码图片">

<!-- 同步解码，图片渲染完成后再显示 -->
<img src="avatar.jpg" decoding="sync" alt="同步解码图片">

<!-- 浏览器自动决定（默认） -->
<img src="graphic.jpg" decoding="auto" alt="自动解码图片">
```

## importance

指定资源的加载优先级，影响浏览器加载资源的顺序。

```html
<!-- 高优先级 -->
<link rel="stylesheet" href="critical.css" importance="high">

<!-- 低优先级 -->
<img src="background.jpg" importance="low" alt="背景图">

<!-- 自动优先级（默认） -->
<script src="analytics.js" importance="auto"></script>
```

## referrerpolicy

控制在请求资源时发送的 Referer 头信息。

```html
<!-- 不发送 Referer 头 -->
<a href="http://example.com" referrerpolicy="no-referrer">链接</a>

<!-- 发送源信息（协议+主机名+端口） -->
<img src="image.jpg" referrerpolicy="origin" alt="图片">

<!-- 跨域时不发送，同域时发送完整URL -->
<iframe src="page.html" referrerpolicy="origin-when-cross-origin"></iframe>
```