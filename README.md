# Doc

## 简介

这是一个基于 [VitePress](https://vitepress.dev/) 构建的中文技术文档站点，旨在系统性地整理与沉淀作者在前端、后端及工具链上的学习笔记与实践经验。项目以「方便自己，若能帮到他人则更好」为初衷，秉承开源精神，以 MIT 协议开源。

- 📚 整理前后端技术栈的核心知识点
- 🧩 展示可交互的组件化代码示例
- 🛠 实践文档站点最佳工程化实践
- ⚙️ 沉淀 50+ 个实用的前端工具函数

## 项目规模

项目内容会随学习的推进持续更新，文档数量与主题覆盖不断新增或调整，因此不在这里罗列具体数字。目前规模大致为：

- 数百篇 Markdown 技术文档，覆盖多个技术栈
- 数十个可交互的 Vue 示例组件
- 50+ 个可直接复用的前端工具函数

## 内容覆盖

内容覆盖前端、后端、工程化及工具链等众多方向，主要包括：

- **前端核心**：HTML、CSS、JavaScript、TypeScript、WebAPI、HTTP 等
- **框架**：Vue、React、VitePress 及常见 UI 框架
- **构建与工程化**：Vite、Webpack、Rollup、前端工程化、性能优化、测试
- **后端**：NodeJS、Express、Koa、MySQL、Nginx
- **应用开发**：Electron、React Native、uni-app、微信小程序
- **工具/环境**：Git、Docker、VSCode、Chrome、Windows 等
- **其他**：算法、面试题、常用单词、Emoji、语义化版本规范、个人笔记

## 工程化特性

- **自定义 VitePress 插件**：自动生成侧边栏、`CodeDemo` 可交互示例容器、demo 动态导入、构建产物 public html 处理、分组图标
- **Markdown 增强**：数学公式、代码行号、图片懒加载与缩放预览（medium-zoom）
- **主题定制**：深色/浅色模式、回到顶部、自定义布局与样式
- **工具函数库**：`src/utils` 收录防抖、节流、深拷贝、颜色转换、金额格式化等 50+ 个可直接复用的工具函数
- **构建优化**：产物体积分析脚本（`dist-analyzer`）、分块大小警告阈值、环境变量化配置
- **写作规范**：`writing-style-guide.md` 统一代码、列表、标题、链接等格式规范

## 快速开始

```bash
# 安装依赖（使用 pnpm）
pnpm install

# 启动开发服务器（默认端口 9527）
pnpm dev

# 构建生产产物
pnpm build

# 本地预览构建产物
pnpm preview

# 类型检查
pnpm type-check

# 分析构建产物体积
pnpm dist-analyzer
```

## 目录结构

- 每个技术栈在 `src` 目录下都有一个单独的目录，如 `src/react`、`src/vue` 等。
- 组件放在各自的 `components` 目录下，比如 vue 的 transition 组件需要演示组件，则放在 `src/vue/components` 目录下，如果 transition 有单独的目录则放在 `src/vue/transition/components` 目录下。
- 图片与组件存放规则一样。

## 侧边栏

> [!WARNING]
> 暂未实现该功能

如果需要自动生成侧边栏，请将 sidebar 的 text 按照以下格式书写：

```ts
{
  // [原 text 属性值](需要生成的目录路径)
  text: '[text](/src/js)',
}
```

## 开源协议

本项目基于 [MIT](https://github.com/xiangheng08/doc/blob/main/LICENSE) 协议开源。如果发现任何错误，欢迎提交 [Issue](https://github.com/xiangheng08/doc/issues) 或 [PR](https://github.com/xiangheng08/doc/pulls)，非常感谢你的支持！
