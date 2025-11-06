# 工具与生态集成

Lit 与现代 Web 开发工具链良好集成，支持 TypeScript、各种构建工具和开发工具。

## TypeScript 支持

Lit 官方提供完整的 TypeScript 支持，包括类型定义和装饰器：

```typescript
import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  @property({ type: String })
  name: string = 'World';

  @state()
  private _count: number = 0;

  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<p>Hello, ${this.name}! Count: ${this._count}</p>`;
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    // 在这里可以安全地访问 DOM
  }
}
```

### TypeScript 配置

推荐的 tsconfig.json 配置：

```json
{
  "compilerOptions": {
    "target": "es2021",
    "module": "es2020",
    "lib": ["es2021", "DOM", "DOM.Iterable"],
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "inlineSources": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "forceConsistentCasingInFileNames": true,
    "useDefineForClassFields": false
  },
  "include": ["src/**/*.ts"],
  "exclude": []
}
```

## 构建工具集成

### Vite

Vite 是开发 Lit 组件的优秀选择：

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/my-element.js',
      formats: ['es'],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
});
```

### Webpack

使用 Webpack 配置 Lit 项目：

```js
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
};
```

### Rollup

使用 Rollup 构建 Lit 组件：

```js
// rollup.config.js
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', {
          targets: {
            esmodules: true,
          },
        }],
      ],
    }),
  ],
  external: ['lit'],
};
```

## 开发工具集成

### Storybook

为 Lit 组件配置 Storybook：

```js
// .storybook/main.js
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/web-components',
};
```

```js
// my-element.stories.js
import { html } from 'lit';
import './my-element.js';

export default {
  title: 'My Element',
  component: 'my-element',
};

export const Basic = () => html`<my-element></my-element>`;

export const WithName = () => html`<my-element name="Storybook"></my-element>`;
```

### ESLint

配置 ESLint 进行代码检查：

```js
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    es2021: true,
  },
  rules: {
    // 自定义规则
  },
};
```

### Playwright

使用 Playwright 进行端到端测试：

```typescript
// my-element.test.ts
import { test, expect } from '@playwright/test';

test('should update count on button click', async ({ page }) => {
  await page.goto('/my-element');
  
  const button = await page.locator('my-element button');
  await button.click();
  
  await expect(page.locator('my-element span')).toHaveText('1');
});
```

### Jest

使用 Jest 进行单元测试：

```typescript
// my-element.test.ts
import { fixture, html } from '@open-wc/testing';
import './my-element.js';

describe('MyElement', () => {
  it('should render correctly', async () => {
    const el = await fixture(html`<my-element></my-element>`);
    expect(el).shadowDom.to.equal('<p>Hello, World!</p>');
  });

  it('should update name property', async () => {
    const el = await fixture(html`<my-element name="Test"></my-element>`);
    expect(el.shadowRoot?.textContent).to.include('Hello, Test!');
  });
});
```

## 调试工具

### 浏览器 DevTools

Lit 组件与浏览器开发者工具完全兼容：

1. 可以在 Elements 面板中检查 Shadow DOM
2. 在 Console 中直接访问组件属性和方法
3. 使用 Performance 面板分析渲染性能

```js
// 在浏览器控制台中调试
const element = document.querySelector('my-element');
console.log(element.name); // 访问属性
element.name = 'New Name'; // 修改属性
element.requestUpdate(); // 请求更新
```

### Lit DevTools

Lit DevTools 是专门为 Lit 开发的 Chrome 扩展：

1. 显示组件树和属性
2. 检查组件状态和属性
3. 调试渲染更新

## 包管理

### npm

发布 Lit 组件到 npm：

```json
{
  "name": "my-lit-component",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "module": "index.js",
  "exports": {
    ".": "./index.js"
  },
  "files": [
    "index.js",
    "src/"
  ],
  "peerDependencies": {
    "lit": "^2.0.0"
  }
}
```

### 发布脚本

package.json 中的构建和发布脚本：

```json
{
  "scripts": {
    "build": "rollup -c",
    "dev": "vite",
    "test": "npm run test:unit && npm run test:e2e",
    "test:unit": "jest",
    "test:e2e": "playwright test",
    "lint": "eslint src/**/*.ts",
    "prepublishOnly": "npm run build"
  }
}
```

## 生态系统

### 官方库

1. `@lit/reactive-element` - Lit 的核心响应式基础库
2. `lit-html` - Lit 的模板系统
3. `@lit/localize` - 国际化支持
4. `@lit-labs` - 实验性功能和库

### 社区库

1. `@open-wc` - Web Component 开发工具集
2. `lit-analyzer` - Lit 组件的静态分析工具
3. `@vaadin/component-base` - Vaadin 组件基础库

### 设计系统

许多设计系统基于 Lit 构建：

1. Material Web (Material Design Components)
2. Shoelace
3. Vaadin Components
4. Lion Web Components

## 最佳实践

1. 使用 TypeScript 获得更好的开发体验
2. 配置适当的构建工具以优化生产环境性能
3. 使用 Storybook 等工具进行组件开发和文档编写
4. 实施自动化测试确保组件质量
5. 使用 ESLint 等工具保持代码质量
6. 利用浏览器 DevTools 进行调试
7. 跟踪 Lit 生态系统的新工具和最佳实践
