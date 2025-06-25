# 读取 ENV 文件、格式化和验证

## 最佳实践

::: code-group

<<< ./config.ts [config.ts]

<<< ./.env

:::

输出结果如下：

```shell
{
  API_KEY: '11111111111111',
  ADMIN_EMAIL: 'admin@gmail.com',
  EMAIL_CONFIG_JSON: {
    host: 'smtp.gmail.com',
    port: 587,
    username: 'admin@gmail.com',
    password: 'admin'
  },
  NODE_ENV: 'development',
  CORS: '*',
  SOCKET_IO: true,
  TOKEN_EXPIRY: 604800000,
  PRIVATE_KEY: '-----BEGIN RSA PRIVATE KEY-----\n' +
    '...\n' +
    'Kh9NV...\n' +
    '...\n' +
    '-----END RSA PRIVATE KEY-----'
}
```

以上代码需要安装以下模块：

::: code-group

```bash [pnpm]
pnpm add dotenv envalid ms
pnpm add -D @types/ms 
```

```bash [yarn]
yarn add dotenv envalid ms
yarn add -D @types/ms
```

```bash [npm]
npm i dotenv envalid ms
npm i -D @types/ms
```

:::
