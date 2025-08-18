# 使用 docker 部署 Gitea

## docker-compose.yml

<<< ./docker-compose.yml

## 同时安装 Act Runner

> config.yaml 配置[参考](/gitea/act_runner/config_yaml)

::: code-group

<<< ./docker-compose.and-runner.yml

<<< ./.env.docker-compose.and-runner [.env]

:::

## 相关链接

- [使用 Docker 安装 | Gitea Documentation](https://docs.gitea.com/zh-cn/installation/install-with-docker)
- [Act Runner | Gitea Documentation](https://docs.gitea.com/zh-cn/usage/actions/act-runner)
