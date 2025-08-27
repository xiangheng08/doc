# personal access token

Personal Access Token (PAT) 是 GitHub 提供的一种用于身份验证和授权的令牌机制。它允许用户在不使用用户名和密码的情况下，安全地访问 GitHub 资源。

- **安全性**：相比传统的用户名/密码认证方式，PAT 提供了更高的安全性，可以随时撤销或重新生成
- **权限控制**：可以为不同的 PAT 设置不同的权限范围（scopes），实现最小权限原则
- **使用场景**：
  - 命令行工具访问 GitHub
  - CI/CD 流水线集成
  - 第三方应用访问 GitHub API
  - 自动化脚本操作仓库
- **有效期**：可以设置令牌的过期时间，增强安全性

PAT 是现代 Git 工作流中推荐的身份验证方式，特别是在需要程序化访问 GitHub 资源时。

## 创建个人访问令牌

1. 登录 Github
2. 点击右上角头像，选择 Settings
3. 点击 Developer settings
4. 点击 Personal access tokens
5. 点击 Generate new token
6. 填写 Token name
7. 选择 scopes
8. 点击 Generate token
9. 复制 token（注意：token 只会显示一次，请妥善保管！）

## 远程地址格式

```
https://<username>:<personal_access_token>@github.com/<username>/<repository>
```
