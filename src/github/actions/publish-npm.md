# 发布到 NPM

## 前提条件

- 你的 github 仓库是的公开的且有开源协议（LICENSE）
- 你的这个 npm 库是公共库的，不能是私有库
- `package.json` 中不能有 `private` 字段
- `package.json` 中要有 `license` 字段
  ```json
  {
    "license": "MIT" // 换成你自己的开源协议
  }
  ```
- `package.json` 中要有 `repository` 字段，其中的 `url` 字段要指向你的 github 仓库
  ```json
  {
    "repository": {
      "type": "git",
      "url": "https://github.com/<username>/<repository>" // 你的仓库地址
    },
  }
  ```

## 工作流文件

```yaml [.github/workflows/publish-npm.yml]
name: Publish Package to npmjs
on:
  release:
    types: [published]
jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - uses: actions/checkout@v4
      # Setup .npmrc file to publish to npm
      - uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm publish --provenance --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## 使用 pnpm 构建的工作流文件

```yaml [.github/workflows/publish-npm.yml]
name: Publish Package to npmjs
on:
  release:
    types: [published]
jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 9

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          registry-url: 'https://registry.npmjs.org'
          cache: pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Publish to npmjs
        run: npm publish --provenance --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## 发布流程

1. 确保你的代码已经准备好发布，建议在发布之前在本地跑一边流程（测试、构建这些）
2. 登录 npm，点击`头像` -> `Account` -> `Access Tokens`
3. 新建一个 `Access Tokens`，确保这个 token 具有你要发布的这个库的权限（权限不要给的太多，给的越多，万一泄露，危害就越大）
4. 创建好这个 token 后，复制它（注意先不要动这个页面，这个 token 只会显示一次，以防意外情况）
5. 进入你的 github 仓库，点击 `Settings` -> `Actions secrets and variables` -> `New repository secret` 新建存储库密钥
6. 名称填入 `NPM_TOKEN`，并粘贴刚刚复制的 token
7. 创建好密钥后，回到你的项目首页，进入 `Releases`，点击 `Draft a new release`
8. 选择/创建好标签，填好标题、发布说明，最后点击 `Publish release`
9. 创建成功后，就可以在 `Actions` 页面中看到你的发布任务在执行了
10. 等待它执行成功，然后就可以在 npm 上看到你的包了

## 相关链接

- [npm-publish](https://docs.npmjs.com/cli/v9/commands/npm-publish)
- [发布 Node.js 包 - GitHub 文档](https://docs.github.com/zh/actions/tutorials/publish-packages/publish-nodejs-packages#publishing-packages-to-the-npm-registry)
- [测试仓库](https://github.com/xiangheng08/npm-publish-test): 笔记中没有写的可以参考这个仓库
- [测试 npm 库](https://www.npmjs.com/package/@xiangheng08/npm-publish-test)
