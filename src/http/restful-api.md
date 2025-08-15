# RESTful API 设计规范

REST (Representational State Transfer) 是一种软件架构风格，用于设计网络应用的接口。本文档介绍 RESTful API 的设计原则和最佳实践。

## 核心概念

### 1. 资源（Resources）
- REST 的核心理念是面向资源的
- 每个资源都有一个唯一的 URI
- 资源可以是单个条目或集合
- 使用名词而不是动词来表示资源

### 2. HTTP 方法的正确使用

| HTTP方法 | 用途 | 特性 | 示例 |
|---------|------|------|------|
| GET | 获取资源 | 安全且幂等 | `GET /api/users` |
| POST | 创建资源 | 非幂等 | `POST /api/users` |
| PUT | 完整更新资源 | 幂等 | `PUT /api/users/1` |
| PATCH | 部分更新资源 | 幂等 | `PATCH /api/users/1` |
| DELETE | 删除资源 | 幂等 | `DELETE /api/users/1` |

### 3. URL 设计规范

#### 基本规则
- 使用名词复数形式表示资源集合
- 使用小写字母
- 使用连字符（-）而不是下划线（_）
- 不在 URL 末尾添加斜杠（/）

#### 示例
```
GET /api/articles               # 获取文章列表
GET /api/articles/123           # 获取特定文章
GET /api/users/456/articles     # 获取用户的文章
```

## 最佳实践

### 1. 版本控制
```
/api/v1/users
/api/v2/users
```

或通过 HTTP 头：
```
Accept: application/vnd.company.api-v1+json
```

### 2. 分页
```
GET /api/articles?page=2&per_page=100
```

### 3. 过滤和排序
```
GET /api/articles?status=published&category=tech
GET /api/articles?sort=created_at&order=desc
```

### 4. 响应格式

#### 成功响应
```json
{
    "data": {
        "id": 1,
        "name": "John Doe"
    },
    "meta": {
        "total": 100,
        "page": 1
    }
}
```

#### 错误响应
```json
{
    "error": {
        "code": "INVALID_PARAMETER",
        "message": "Invalid user ID provided",
        "details": {
            "field": "user_id",
            "value": "abc"
        }
    }
}
```

### 5. HTTP 状态码使用

- 200: 成功获取资源
- 201: 成功创建资源
- 204: 成功删除资源
- 400: 请求参数错误
- 401: 未认证
- 403: 权限不足
- 404: 资源不存在
- 422: 请求格式正确但语义错误

> 更多的 HTTP 状态码可以看[这里](./status)

## 安全性考虑

### 1. 认证和授权
- 使用 JWT 或 OAuth 2.0 进行身份认证
- 在请求头中使用 Bearer token
```
Authorization: Bearer <token>
```

### 2. 速率限制
- 实施 API 调用频率限制
- 在响应头中包含限制信息
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1534567890
```

### 3. CORS
- 正确配置跨域资源共享
- 设置适当的 `Access-Control-Allow-*` 头

## 文档化

### 1. API 文档要素
- 端点描述
- 请求/响应示例
- 认证方法
- 错误码说明
- 速率限制说明

### 2. 推荐的文档工具
- Swagger/OpenAPI
- API Blueprint
- Postman

## 测试

### 1. 测试类型
- 单元测试
- 集成测试
- 端到端测试

### 2. 测试要点
- 验证成功和失败场景
- 检查边界条件
- 验证安全机制
- 测试性能和负载
