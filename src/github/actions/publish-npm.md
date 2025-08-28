# 发布到NPM

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

## 相关链接

- [npm-publish](https://docs.npmjs.com/cli/v9/commands/npm-publish)
- [发布 Node.js 包 - GitHub 文档](https://docs.github.com/zh/actions/tutorials/publish-packages/publish-nodejs-packages#publishing-packages-to-the-npm-registry)
