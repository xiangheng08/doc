# Docker

## 简介

Docker 是一个开源的应用容器引擎，基于 Go 语言开发。它可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器或 Windows 机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口。

## 特点

- **轻量级**：相比传统虚拟机，容器共享宿主机内核，启动速度快，资源占用少
- **可移植性**：一次构建，到处运行（Build Once, Run Anywhere）
- **隔离性**：每个容器都有自己的文件系统、网络和进程空间
- **版本控制**：支持镜像的版本管理和变更追踪
- **快速部署**：容器可以在几秒钟内启动或停止
- **弹性伸缩**：支持快速水平扩展和收缩应用实例
- **生态系统**：拥有丰富的镜像仓库和工具链（Docker Hub、Docker Compose等）

## 历史

Docker 的发展历史可以追溯到 Linux 容器技术（LXC）：

- **2008年**：Solomon Hykes 在法国巴黎创立了 dotCloud 公司
- **2013年**：dotCloud 开源了 Docker 项目，并专注于 Docker 的开发
- **2013年**：Docker 项目在 GitHub 上发布，迅速获得社区关注
- **2014年**：发布 Docker 1.0 版本，标志着项目进入生产可用阶段
- **2015年**：成立 Docker 公司，专注企业级容器解决方案
- **至今**：成为容器技术的事实标准，推动了云原生技术的发展

Docker 的出现彻底改变了软件开发和部署的方式，为 DevOps 和微服务架构提供了重要基础。

## 相关链接

- [Docker 官网](https://www.docker.com/)
- [Docker GitHub 仓库](https://github.com/docker/docker-ce)
- [Docker Hub](https://hub.docker.com/)
- [Docker 文档](https://docs.docker.com/)
