# 样式穿透

## 什么是样式穿透
当使用 `<style scoped>` 时，Vue 会为组件添加唯一属性标识，父组件的样式默认不会影响子组件。样式穿透（Style Penetration）用于强制样式影响子组件。

## Vue2 实现方式

### 1. 原生 CSS
```css
/* 使用 >>> 操作符 */
.parent >>> .child-component {
  color: red;
}
```

### 2. 预处理器兼容
```scss
/* 使用 /deep/ 或 ::v-deep */
.parent {
  /deep/ .child-component {
    color: blue;
  }
  
  ::v-deep .child-component {
    font-size: 16px;
  }
}
```

## Vue3 实现方式
Vue3 废弃了 `/deep/` 和 `>>>`，统一使用 `::v-deep`

### 1. 标准写法
```css
::v-deep(.child-component) {
  border: 1px solid #ccc;
}
```

### 2. 结合SCSS/LESS
```scss
:deep(.child-component) {
  background: #f5f5f5;
}
```

## 不同预处理器的写法

### 原生 CSS
```css
.parent >>> .child { ... }
```

### LESS
```less
.parent {
  /deep/ .child {
    color: red;
  }
}
```

### SCSS
```scss
.parent {
  ::v-deep .child {
    padding: 10px;
  }
}
```

### Vue3 + SCSS (推荐)
```scss
:deep(.child) {
  margin: 20px;
}
```

## 最佳实践

1. **优先使用 Vue3 的 `:deep()` 语法**
2. **避免全局样式污染**  
   始终将穿透样式包裹在父选择器中
3. **谨慎使用穿透**  
   优先考虑子组件暴露的 props/CSS 变量
4. **预处理注意事项**  
   - SCSS 中 `>>>` 无效
   - LESS 需要版本 > 3.5.0
5. **替代方案**  
   考虑使用 CSS Modules 或 `:global` 修饰符

---

> **注意**：样式穿透可能破坏组件封装性，建议仅用于修改第三方组件库样式等必要场景
