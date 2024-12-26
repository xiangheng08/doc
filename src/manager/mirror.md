# 镜像源

## 镜像源集合

| 名称               | 链接                                            |
| ------------------ | ----------------------------------------------- |
| npm 官方源         | https://registry.npmjs.org/                     |
| yarn 官方源        | https://registry.yarnpkg.com/                   |
| 淘宝源             | https://registry.npmmirror.com/                 |
| 腾讯源             | https://mirrors.cloud.tencent.com/npm/          |
| cnpm 源            | https://r.cnpmjs.org/                           |
| npm CouchDB 镜像源 | https://skimdb.npmjs.com/registry/              |
| 阿里源             | https://registry.npm.alibaba-inc.com/           |
| 华为源             | https://mirrors.huaweicloud.com/repository/npm/ |
| 网易源             | https://mirrors.163.com/npm/                    |
| 中科大源           | https://mirrors.ustc.edu.cn/                    |
| 清华源             | https://mirrors.tuna.tsinghua.edu.cn/           |

## 镜像源切换

::: code-group

```bash [npm]
# 查看源
npm get registry
# 设置源
npm config set registry https://registry.npmmirror.com/
# 恢复官方源
npm config set registry https://registry.npmjs.org/
```

```bash [pnpm]
# 查看源
pnpm get registry
# 设置源
pnpm config set registry https://registry.npmmirror.com/
# 恢复官方源
pnpm config set registry https://registry.npmjs.org/
```

```bash [yarn]
# 查看源
yarn config get registry
# 设置源
yarn config set registry https://registry.npmmirror.com/
# 恢复官方源
yarn config set registry https://registry.yarnpkg.com/
```

:::
