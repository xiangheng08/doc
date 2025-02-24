# Nginx 反向代理

---

## 基础概念
反向代理（Reverse Proxy）用于将客户端请求转发到后端服务器，隐藏真实服务器信息，常用于负载均衡、安全防护、SSL终止等场景。

---

## 核心配置指令

1. **`proxy_pass`**  
   定义后端服务器地址，格式：`proxy_pass http://backend_server;`  
   ```nginx
   location / {
       proxy_pass http://localhost:3000; # 转发到本机3000端口
   }
   ```

2. **`proxy_set_header`**  
   修改转发到后端的请求头，常用配置：  
   ```nginx
   proxy_set_header Host $host;
   proxy_set_header X-Real-IP $remote_addr;
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   proxy_set_header X-Forwarded-Proto $scheme;
   ```

3. **`proxy_redirect`**  
   修改后端返回的`Location`和`Refresh`头：  
   ```nginx
   proxy_redirect off; # 关闭自动重定向修正
   ```

---

## 实战配置示例

### 基础反向代理
```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
- 将所有`example.com`的请求转发到本机3000端口
- 保留原始客户端IP（通过`X-Real-IP`头）

---

### 负载均衡
```nginx
upstream backend {
    server 10.0.0.1:8080 weight=3; # 权重3
    server 10.0.0.2:8080;
    server 10.0.0.3:8080 backup;   # 备用服务器
}

server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
    }
}
```
- 使用`upstream`模块定义服务器集群
- `weight`设置权重，`backup`标记备用服务器

---

### WebSocket代理
```nginx
server {
    listen 80;
    server_name ws.example.com;

    location / {
        proxy_pass http://backend_ws;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400; # 长连接超时
    }
}
```
- `Upgrade`和`Connection`头用于WebSocket协议升级
- 延长超时时间保持长连接

---

### SSL终止代理
```nginx
server {
    listen 443 ssl;
    server_name secure.example.com;

    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header X-Forwarded-Proto https; # 告知后端使用HTTPS
    }
}
```
- 处理SSL加密后转发明文到后端
- 通过`X-Forwarded-Proto`头告知后端协议类型

---

### 静态文件缓存
```nginx
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m;

server {
    listen 80;
    server_name static.example.com;

    location / {
        proxy_cache my_cache;
        proxy_pass http://static_backend;
        proxy_cache_valid 200 304 12h; # 缓存200/304状态码内容
        add_header X-Cache-Status $upstream_cache_status;
    }
}
```
- 使用`proxy_cache_path`定义缓存路径
- `add_header`显示缓存命中状态

---

### 传递客户端信息

```nginx
# Nginx代理服务器配置
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:8080;
        
        # 核心配置：传递客户端信息
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;                     # 客户端真实IP（单层代理）
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # 客户端IP链（适用于多层代理）
        proxy_set_header X-Forwarded-Proto $scheme;                  # 原始协议（http/https）
        
        proxy_redirect off;
    }
}
```

## 常用调优参数
```nginx
proxy_buffering on;              # 启用响应缓冲
proxy_buffer_size 4k;            # 响应头缓冲区大小
proxy_buffers 8 16k;             # 响应内容缓冲区
proxy_connect_timeout 60s;       # 连接后端超时
proxy_send_timeout 60s;          # 发送请求超时
proxy_read_timeout 60s;          # 读取响应超时
```

---

## 调试技巧
1. 查看完整请求头：
```nginx
location / {
    proxy_pass http://backend;
    proxy_set_header X-Debug-Info "From Nginx";
}
```

2. 记录原始请求日志：
```nginx
log_format proxy_log '$remote_addr - $http_x_real_ip [$time_local] '
                     '"$request" $status $body_bytes_sent';
access_log /var/log/nginx/proxy.log proxy_log;
```

---

## 完整配置文件示例
```nginx
user www-data;
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    upstream backend {
        server 10.0.0.1:8080;
        server 10.0.0.2:8080;
    }

    server {
        listen 80;
        server_name example.com;

        location / {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_redirect off;
        }

        location /static/ {
            alias /var/www/static/;
            expires 30d;
        }
    }
}
```

---

## 注意事项
1. 修改配置后需验证并重载：  
   ```bash
   nginx -t && nginx -s reload
   ```
2. 注意防火墙放行端口
3. 生产环境建议启用`access_log`和`error_log`
