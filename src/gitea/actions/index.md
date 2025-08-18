# Gitea Actions 介绍

## 什么是 Gitea Actions

Gitea Actions 是 Gitea 内置的持续集成/持续部署(CI/CD)系统，类似于 GitHub Actions。它允许开发者通过定义工作流来自动化软件开发流程，包括代码构建、测试、打包和部署等任务。

## 核心概念

### 工作流 (Workflows)
工作流是自动化过程的可配置单元。它们被定义为 YAML 文件，存储在代码仓库的 `.gitea/workflows/` 目录中。每个工作流包含一个或多个作业(Job)。

### 事件 (Events)
事件是触发工作流执行的条件。常见的事件包括：
- `push`：代码推送到仓库
- `pull_request`：创建或更新拉取请求
- `issue`：创建或更新议题
- 手动触发

### 作业 (Jobs)
作业是工作流中的独立任务单元，包含一系列步骤。作业可以在不同的运行器上并行或顺序执行。

### 步骤 (Steps)
步骤是作业中的单个任务，可以运行命令或使用预定义的操作。

### 操作 (Actions)
操作是可重复使用的单元，封装了复杂的任务。Gitea 和社区提供了许多预构建的操作。

## 工作流语法

### 基本结构
```yaml
name: 工作流名称
on: 触发事件
jobs:
  job_id:
    name: 作业名称
    runs-on: 运行环境
    steps:
      - step1
      - step2
```

### 常用字段
- [name](file://d:\mine\doc\src\element-ui\encapsulation\InputSuggestions.vue#L1-L1): 工作流或作业的显示名称
- [on](file://d:\mine\doc\src\ts\event-emitter.ts#L17-L34): 定义触发工作流的事件
- `jobs`: 定义工作流中的作业
- `runs-on`: 指定运行作业的环境标签
- `steps`: 定义作业中的步骤列表

## 常见用例

### 自动化测试
```yaml
name: 运行测试
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: 设置 Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
      - run: npm install
      - run: npm test
```

### 构建和部署
```yaml
name: 构建和部署
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: 构建项目
        run: |
          npm install
          npm run build
      - name: 部署到服务器
        run: |
          # 部署命令
```

### 多环境测试
```yaml
name: 多环境测试
on: [push]
jobs:
  test-linux:
    runs-on: ubuntu-latest
    steps:
      # Linux 测试步骤
  test-windows:
    runs-on: windows-latest
    steps:
      # Windows 测试步骤
  test-macos:
    runs-on: macos-latest
    steps:
      # macOS 测试步骤
```

## 环境变量和密钥

### 默认环境变量
Gitea Actions 提供了许多默认环境变量：
- `GITHUB_ACTOR`: 触发工作流的用户
- `GITHUB_REPOSITORY`: 仓库名称
- `GITHUB_REF`: 触发工作流的分支或标签

### 自定义环境变量
可以在工作流中定义自定义环境变量：
```yaml
env:
  NODE_ENV: production
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### 密钥管理
敏感信息如密码、API 密钥应存储在仓库密钥中，而不是直接写在工作流文件中。

## 最佳实践

### 工作流设计
1. 将复杂的流程分解为多个作业
2. 合理使用并行和依赖关系
3. 使用缓存提高构建速度
4. 添加适当的错误处理

### 安全性
1. 不要在代码中硬编码敏感信息
2. 使用密钥存储敏感数据
3. 定期审查和更新权限
4. 限制第三方操作的使用

### 性能优化
1. 使用缓存避免重复下载
2. 合理设置超时时间
3. 选择合适的运行器标签
4. 清理不必要的文件和依赖

## 与 GitHub Actions 的区别

虽然 Gitea Actions 受到 GitHub Actions 的启发，但两者之间仍有一些区别：
- 配置文件存储在 `.gitea/workflows/` 而不是 `.github/workflows/`
- 某些操作可能不完全兼容
- 运行器实现有所不同
- 部分功能可能存在差异

## 相关链接

- [Gitea Actions 官方文档](https://docs.gitea.com/usage/actions/overview)
- [Act Runner 配置](/gitea/act_runner/)
- [Gitea Actions 快速入门 | Gitea Documentation](https://docs.gitea.com/zh-cn/usage/actions/quickstart)
- [GitHub Actions 的工作流语法](https://docs.github.com/zh/actions/reference/workflows-and-actions/workflow-syntax)
