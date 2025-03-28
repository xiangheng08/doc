# Axios 通用封装

## 介绍

`request.ts` 是一个对 Axios 进行通用封装的 TypeScript 文件。它提供了以下功能：

- **基础配置**：设置了 `baseURL`、`timeout` 和默认的 `Content-Type`。
- **请求拦截器**：在发送请求之前自动添加 `Authorization` 头，使用 `localStorage` 中的 `token`。
- **响应拦截器**：对响应数据进行处理，并对不同的 HTTP 状态码进行错误处理。

## 代码

<<< ./universal-request.ts
