# DTO

DTO（Data Transfer Object）即数据传输对象，是一种在软件开发中常用的设计模式。它主要用于在不同的软件层或应用程序之间传输数据。

## DTO 的主要特点

1. **数据容器**：DTO 通常是一个简单的数据结构，只包含数据字段和对应的访问方法（getter/setter），不包含业务逻辑。
2. **减少网络调用**：通过将多个相关数据打包到一个 DTO 中，可以减少网络传输次数。
3. **解耦**：DTO 可以帮助解耦系统的不同层，特别是当数据源和数据展示格式不完全一致时。
4. **数据隐藏**：只暴露需要传输的数据，隐藏内部实现细节。

## DTO 的使用场景

- 在 Web 应用中，用于在前端和后端之间传输数据
- 在微服务架构中，用于服务间的数据传输
- 在数据库层和业务逻辑层之间传输数据
- 在 API 接口中定义请求和响应的数据结构

## 示例

```ts
// User DTO
interface UserDTO {
  id: number
  name: string
  email: string
}

// User Entity
class User {
  // 从 DTO 创建 User Entity
  static fromDTO(DTO: UserDTO){
    return new User(DTO.id, DTO.name, DTO.email)
  }

  id: number
  name: string
  email: string

  constructor(id: number, name: string, email: string) {
    this.id = id
    this.name = name
    this.email = email
  }

  // 转换为 DTO
  toDTO(): UserDTO {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    }
  }

  // methods
  getId(): number {
    return this.id
  }

  setId(id: number): void {
    this.id = id
  }
}
```

## DTO 与 VO、BO、PO 的区别

- **DTO (Data Transfer Object)**：主要用于数据传输，特别是在不同层或服务之间
- **VO (View Object)**：用于展示层，通常是为了适配特定界面而创建的数据对象
- **BO (Business Object)**：包含业务逻辑的对象
- **PO (Persistent Object)**：持久化对象，通常与数据库表结构对应

## 最佳实践

1. **保持简单**：DTO 应该只包含数据，不包含业务逻辑
2. **可序列化**：确保 DTO 可以被序列化，以便在网络中传输
3. **版本控制**：对 DTO 进行版本控制，以支持 API 的向后兼容性
4. **命名规范**：使用清晰的命名约定，如在类名后加上 DTO 后缀
