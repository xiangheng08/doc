# Act Runner 介绍

## 什么是 Act Runner

Act Runner 是 Gitea 的官方 CI/CD 运行器，用于执行 Gitea Actions 中定义的工作流任务。它是一个独立的组件，可以部署在任何支持的平台上，用于运行自动化构建、测试和部署任务。

## 主要功能

### 工作流执行
- 执行在 `.gitea/workflows` 中定义的 YAML 工作流
- 支持多种运行环境（Docker 容器、主机环境等）
- 并发任务执行支持

### 多平台支持
- 支持 Linux、Windows、macOS 等操作系统
- 可运行在物理机、虚拟机或容器中
- 支持 ARM 和 x86 架构

### 灵活的部署方式
- 支持 Docker 容器部署
- 支持二进制文件直接运行
- 支持作为系统服务运行

## 核心概念

### Runner
Runner 是执行作业的实际工作节点。每个 runner 都需要在 Gitea 实例上注册，并可以配置特定的标签来标识其功能和环境。

### Labels
标签用于匹配工作流中定义的运行要求。例如，工作流可能要求在 "ubuntu-latest" 环境中运行，而 runner 可以通过设置相应的标签来声明它能满足这个要求。

### 容器化执行
Act Runner 支持在隔离的容器环境中执行任务，提高安全性和环境一致性。

## 配置选项

### 基本配置
- 日志级别设置
- 并发执行容量
- 超时设置
- 网络和安全配置

### 环境配置
- 自定义环境变量
- 从文件加载环境变量
- 工作目录设置

### 缓存支持
- 内置缓存服务器
- 外部缓存服务器支持
- 缓存目录配置

### 容器配置
- Docker 网络模式
- 特权模式支持
- 自定义 Docker 选项
- 卷挂载控制

## 使用场景

### 开发团队
- 自动化代码构建和测试
- 持续集成和持续部署
- 多环境测试支持

### 企业环境
- 私有化部署保证数据安全
- 自定义安全策略
- 与企业内部系统集成

### 开源项目
- 免费的 CI/CD 解决方案
- 灵活的配置选项
- 社区支持和文档

## 相关链接

- [Gitea Actions 文档](https://docs.gitea.com/zh-cn/usage/actions/overview)
- [Act Runner 配置示例](/gitea/act_runner/config_yaml)
- [Act Runner 仓库](https://gitea.com/gitea/act_runner)
