# package.json

## package.json 的作用

`package.json` 是 Node.js 项目的核心配置文件，主要作用包括：
1. **项目元数据管理**：记录项目名称、版本、作者、许可证等基本信息。
2. **依赖管理**：定义项目运行和开发所需的依赖包（`dependencies` 和 `devDependencies`）。
3. **脚本自动化**：通过 `scripts` 字段定义快捷命令（如启动、测试、构建等）。
4. **环境兼容性**：指定 Node.js 版本、操作系统兼容性等。
5. **项目发布**：作为 npm 包的“说明书”，发布到 npm 仓库时依赖此文件。

## 核心字段详解

### 必填字段

- **`name`**  
  - 项目名称，遵循 npm 命名规则（小写、无空格、可含连字符）。  
  - 示例：`"name": "my-project"`

- **`version`**  
  - 项目版本号，遵循语义化版本 `major.minor.patch`。  
  - 示例：`"version": "1.0.0"`

---

### 项目信息类

- **`description`**  
  - 项目描述，用于 npm 搜索和展示。  
  - 示例：`"description": "A simple project manager"`

- **`author`**  
  - 作者信息，支持字符串或对象格式。  
  - 示例：  
    ```json
    "author": "John Doe <john@example.com> (https://johndoe.com)"
    ```

- **`license`**  
  - 开源许可证类型（如 MIT、GPL-3.0）。  
  - 示例：`"license": "MIT"`

- **`repository`**  
  - 代码仓库地址（GitHub、GitLab 等）。  
  - 示例：  
    ```json
    "repository": {
      "type": "git",
      "url": "https://github.com/user/repo.git"
    }
    ```

- **`keywords`**  
  - 项目关键词数组，便于 npm 搜索。  
  - 示例：`"keywords": ["tool", "cli", "utility"]`

---

### 依赖管理类

- **`dependencies`**  
  - 项目运行所需的**生产环境依赖**（如 React、Express）。  
  - 安装命令：`npm install <package>`  
  - 示例：  
    ```json
    "dependencies": {
      "express": "^4.18.2"
    }
    ```

- **`devDependencies`**  
  - 仅开发环境需要的依赖（如测试工具、打包工具）。  
  - 安装命令：`npm install <package> --save-dev`  
  - 示例：  
    ```json
    "devDependencies": {
      "jest": "^29.5.0"
    }
    ```

- **`peerDependencies`**  
  - 声明插件所需的宿主环境版本（如开发 React 组件库时指定 React 版本）。  
  - 示例：`"peerDependencies": { "react": ">=16.8.0" }`

---

### 脚本与命令类

- **`scripts`**  
  - 自定义快捷命令，通过 `npm run <script>` 执行。  
  - 支持通过 `pre` 和 `post` 前缀创建生命周期钩子（例如：`pretest` 会在 `test` 脚本前自动执行）
  - 常用脚本：  
    ```json
    "scripts": {
      "start": "node app.js",
      "pretest": "echo '准备测试环境...'",  // 在 test 前自动执行
      "test": "jest",                   
      "posttest": "echo '测试完成清理工作...'", // 在 test 后自动执行
      "build": "webpack --mode production",
      "lint": "eslint src"
    }
    ```

---

### 环境配置类

- **`main`**  
  - 项目入口文件（如 `index.js`），供其他模块引用时使用。  
  - 示例：`"main": "src/index.js"`

- **`engines`**  
  - 指定 Node.js 或 npm 的兼容版本。  
  - 示例：  
    ```json
    "engines": {
      "node": ">=18.0.0",
      "npm": ">=9.0.0"
    }
    ```

- **`browserslist`**  
  - 定义前端项目兼容的浏览器范围（被 Babel、Autoprefixer 等工具使用）。  
  - 示例：  
    ```json
    "browserslist": ["last 2 versions", "not dead"]
    ```

---

### 发布与私有配置

- **`private`**  
  - 设为 `true` 时，禁止项目发布到 npm（常用于内部项目）。  
  - 示例：`"private": true`

- **`files`**  
  - 定义发布到 npm 时包含的文件（白名单模式）。  
  - 示例：`"files": ["dist", "README.md"]`

---

## 其他常用字段

| 字段              | 说明                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| `bin`             | 定义全局可执行命令（用于 CLI 工具）。                                |
| `types`/`typings` | TypeScript 类型声明文件路径。                                        |
| `config`          | 添加环境变量配置（可通过 `process.env.npm_package_config_*` 读取）。 |

---

## 完整示例

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "A demo application",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "pretest": "echo '准备测试环境...'",
    "test": "jest",
    "posttest": "echo '测试完成清理工作...'",
    "build": "webpack --mode production",
    "lint": "eslint src"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "jest": "^29.5.0"
  },
  "author": "Jane Smith <jane@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/jane/my-app.git"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## 注意事项

1. **版本号语法**：  
   - `^1.2.3`：允许更新次要版本和补丁版本（自动升级到 `1.x.x`）。  
   - `~1.2.3`：仅允许更新补丁版本（自动升级到 `1.2.x`）。  
   - `1.2.3`：固定版本，不自动升级。

2. **依赖安装**：  
   - 运行 `npm install` 会根据 `package.json` 自动安装所有依赖。  
   - `package-lock.json` 需提交到 Git，确保依赖版本一致性。

3. **扩展工具**：  
   - 使用 `npm outdated` 检查过时依赖。  
   - 使用 `npm update` 更新依赖版本。
