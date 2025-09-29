# 前端部署

前端部署是将构建后的代码发布到服务器，让用户可以访问的过程。合理的部署策略能提高应用的可用性和性能。

## 部署流程

### 1. 构建阶段

```bash
# 安装依赖
npm install

# 构建生产环境代码
npm run build
```

### 2. 部署阶段

```bash
# 将构建产物上传到服务器
scp -r dist/ user@server:/var/www/html/

# 或使用 rsync 同步
rsync -avz dist/ user@server:/var/www/html/
```

## 部署方式

### 静态资源部署

适用于纯静态网站或 SPA 应用：

```nginx
server {
    listen 80;
    server_name example.com;
    
    location / {
        root /var/www/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Node.js 应用部署

使用 PM2 管理 Node.js 应用：

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start app.js --name "my-app"

# 设置开机自启
pm2 startup
pm2 save
```

### Docker 部署

创建 Dockerfile：

```dockerfile
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

构建和运行：

```bash
# 构建镜像
docker build -t my-app .

# 运行容器
docker run -d -p 80:80 my-app
```

## CI/CD 集成

### GitHub Actions 示例

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        run: |
          # 部署脚本
          echo "Deploying..."
```

### GitLab CI 示例

```yaml
stages:
  - build
  - deploy

build:
  stage: build
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  script:
    - echo "Deploying to server..."
  only:
    - main
```

## 部署最佳实践

### 1. 环境分离

```
开发环境: dev.example.com
测试环境: test.example.com
预发布环境: staging.example.com
生产环境: example.com
```

### 2. 蓝绿部署

通过负载均衡器实现零停机部署：

1. 当前版本运行在蓝色环境
2. 部署新版本到绿色环境
3. 测试通过后，将流量切换到绿色环境
4. 保留蓝色环境作为回滚方案

### 3. 灰度发布

逐步向用户推送新版本：

```js
// 根据用户ID决定是否展示新功能
function isNewFeatureEnabled(userId) {
  // 10% 的用户看到新功能
  return userId % 10 === 0;
}
```

### 4. 回滚策略

```bash
# Git 回滚
git revert <commit-hash>

# 或者重新部署上一个稳定版本
kubectl rollout undo deployment/my-app
```

## 性能优化

### 资源压缩

```html
<!-- 启用 Gzip 压缩 -->
<script src="app.js.gz"></script>
<link rel="stylesheet" href="style.css.gz">
```

### CDN 加速

```html
<!-- 使用 CDN 加速静态资源 -->
<script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>
```

### 缓存策略

```http
Cache-Control: max-age=31536000, immutable
```

## 监控和日志

### 前端错误监控

```js
// 捕获未处理的异常
window.addEventListener('error', (e) => {
  console.error('Error:', e.error);
  // 发送错误信息到监控服务
});

// 捕获未处理的 Promise rejection
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled rejection:', e.reason);
});
```

### 性能监控

```js
// 页面加载性能
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];
  console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart);
});
```

## 相关工具

- Nginx: Web 服务器和反向代理
- Docker: 容器化部署
- Kubernetes: 容器编排
- Jenkins: 自动化部署工具
- GitHub Actions/GitLab CI: CI/CD 工具
- PM2: Node.js 进程管理

## 相关链接

- [Docker 官方文档](https://docs.docker.com/)
- [Nginx 官方文档](https://nginx.org/en/docs/)
- [PM2 官方文档](https://pm2.keymetrics.io/)