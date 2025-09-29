# 前端代码规范

代码规范是前端工程化的重要组成部分，它有助于提高代码质量、可读性和可维护性。

## JavaScript/TypeScript 规范

### 命名规范

1. **变量命名**
   - 使用 camelCase 命名法
   - 常量使用 UPPER_CASE 命名法
   - 布尔值变量使用 is、has、can 等前缀

```js
// 好的示例
const MAX_COUNT = 10;
let currentUser = {};
const isLoading = false;
const hasPermission = true;

// 不好的示例
const maxcount = 10;
let user = {};
const loading = false;
```

2. **函数命名**
   - 使用动词开头，如 get、set、is、has 等
   - 函数名应清晰表达其功能

```js
// 好的示例
function getUserInfo() { }
function setUserRole(role) { }
function isValidEmail(email) { }

// 不好的示例
function info() { }
function role(role) { }
function check(email) { }
```

### 代码结构

1. **文件组织**
   - 一个文件只做一件事
   - 合理组织导出内容

2. **注释规范**
   - 使用 JSDoc 标准注释函数
   - 对复杂逻辑添加行内注释

```js
/**
 * 计算两点之间的距离
 * @param {Object} point1 - 起始点坐标
 * @param {number} point1.x - 起始点x坐标
 * @param {number} point1.y - 起始点y坐标
 * @param {Object} point2 - 终止点坐标
 * @param {number} point2.x - 终止点x坐标
 * @param {number} point2.y - 终止点y坐标
 * @returns {number} 两点之间的距离
 */
function getDistance(point1, point2) {
  // 计算两点间距离的公式
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
}
```

## CSS 规范

### BEM 命名法

```css
/* Block */
.card { }

/* Element */
.card__title { }
.card__content { }

/* Modifier */
.card--large { }
.card__title--highlight { }
```

### 属性书写顺序

1. 定位相关属性：position、top、right、bottom、left、z-index
2. 盒模型相关属性：display、float、width、height、margin、padding
3. 文字相关属性：font、color、text-align、text-decoration
4. 视觉相关属性：background、border、border-radius
5. 其他属性：opacity、cursor、transition

```css
.button {
  /* 定位 */
  position: relative;
  
  /* 盒模型 */
  display: inline-block;
  width: 100px;
  height: 40px;
  padding: 10px 20px;
  
  /* 文字 */
  font-size: 14px;
  color: #333;
  text-align: center;
  
  /* 视觉 */
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  /* 其他 */
  cursor: pointer;
  transition: all 0.3s;
}
```

## Git 提交规范

使用 conventional commits 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 提交类型

- feat: 新功能
- fix: 修复 bug
- chore: 构建过程或辅助工具的变动
- docs: 文档更新
- style: 代码格式调整（不影响代码运行）
- refactor: 重构（即不是新增功能，也不是修改 bug 的代码变动）
- perf: 性能优化
- test: 增加测试

### 示例

```
feat(user): 添加用户登录功能

- 实现登录表单验证
- 添加登录状态管理
- 集成第三方登录接口

Closes #123
```

## 相关工具

### ESLint 配置示例

```json
{
  "extends": ["eslint:recommended"],
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "single"]
  }
}
```

### Prettier 配置示例

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

## 相关链接

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [ESLint 官方文档](https://eslint.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)