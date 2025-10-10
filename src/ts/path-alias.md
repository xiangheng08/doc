# 配置路径别名

路径别名（Path Alias）是一种将长路径映射为简短别名的机制，可以简化模块导入语句，提高代码可读性和维护性。

## TypeScript 中配置路径别名

在 TypeScript 项目中，可以通过 `tsconfig.json` 文件配置路径别名。这主要通过 `compilerOptions` 中的 `baseUrl` 和 `paths` 属性实现。

### 基本配置

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@utils/*": ["src/utils/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

上述配置实现了以下映射：
- `@/xxx` → `src/xxx`
- `@utils/xxx` → `src/utils/xxx`
- `@components/xxx` → `src/components/xxx`

### 项目中的实际应用

假设在当前项目中，我们有如下配置：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

这个配置将 `@/*` 映射到 `src/*`，这样在代码中就可以使用：
```ts
import utils from '@/utils'
```
而不是使用相对路径：
```ts
import utils from '../../utils'
```

## 注意事项

1. **IDE 支持**：大部分现代编辑器（如 VS Code）会自动识别 `tsconfig.json` 中的路径别名
2. **构建工具**：如果使用构建工具（如 Vite、Webpack），需要确保它们也正确配置了路径别名
3. **tsc 编译限制**：使用 `tsc` 编译时不会转换路径别名，如需转换需要使用其他工具（如 Vite、Webpack 或专门的路径别名转换插件）
