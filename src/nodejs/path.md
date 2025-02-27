# path 路径

Node.js 的 `path` 模块是处理文件/目录路径的核心工具，提供跨平台的路径操作支持。通过 `const path = require('path');` 引入。

## 核心属性

### `path.sep`
- **作用**: 返回平台特定的路径分隔符
- **示例**:
  ```js
  console.log(path.sep); // Windows: '\', POSIX: '/'
  ```

### `path.delimiter`
- **作用**: 返回平台特定的环境变量分隔符
- **示例**:
  ```js
  console.log(path.delimiter); // Windows: ';', POSIX: ':'
  ```

### `path.posix` / `path.win32`
- **作用**: 强制使用指定平台的路径规则
- **示例**:
  ```js
  path.win32.join('foo', 'bar'); // 'foo\\bar'
  ```

## 常用方法

### 路径拼接
#### `path.join(...paths)`
- **特点**: 自动处理多余分隔符和`.`/`..`
- **示例**:
  ```js
  path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
  // 返回: '/foo/bar/baz/asdf'
  ```

#### `path.resolve(...paths)`
- **特点**: 从右向左解析绝对路径
- **示例**:
  ```js
  path.resolve('/foo/bar', './baz');
  // 假设当前目录是 /home:
  // 返回: '/foo/bar/baz'
  ```

### 路径解析
#### `path.parse(path)`
- **返回对象**:
  ```js
  {
    root: '/',
    dir: '/home/user',
    base: 'file.txt',
    ext: '.txt',
    name: 'file'
  }
  ```

#### `path.format(pathObject)`
- **逆向操作**: 从对象生成路径字符串
- **示例**:
  ```js
  path.format({ dir: '/home/user', name: 'file', ext: '.txt' });
  // 返回: '/home/user/file.txt'
  ```

### 路径信息获取
| 方法                  | 作用         | 示例         |
| --------------------- | ------------ | ------------ |
| `path.basename(path)` | 获取文件名   | `file.txt`   |
| `path.dirname(path)`  | 获取目录路径 | `/home/user` |
| `path.extname(path)`  | 获取扩展名   | `.txt`       |

## ✅ 使用场景与最佳实践

### 优先使用 path 方法
**错误做法**:
```js
const fullPath = __dirname + '/subdir/' + filename; // 潜在问题
```

**正确做法**:
```js
const fullPath = path.join(__dirname, 'subdir', filename);
```

### 正确处理绝对路径
```js
// 明确需要绝对路径时：
const absolutePath = path.resolve(__dirname, 'config.json');
```

### 跨平台兼容
```js
// 强制 POSIX 风格路径
const posixPath = path.posix.join('foo', 'bar');
```

### 安全处理用户输入
```js
// 防止路径遍历攻击
const userInput = '../secret.txt';
const safePath = path.join(baseDir, path.normalize(userInput));
if (!safePath.startsWith(baseDir)) {
  throw new Error('非法路径!');
}
```

## ⚠️ 常见问题

### `join()` vs `resolve()` 区别？
- `join()`: 单纯拼接路径
- `resolve()`: 从右向左构建绝对路径

### 为什么路径结果包含反斜杠？
- Windows 系统默认使用 `\`，用 `path.posix` 强制统一风格

### 如何处理文件扩展名？
```js
// 安全获取扩展名：
const ext = path.extname('file') || '.txt'; // 处理无扩展名情况
```

### 路径遍历攻击防护
```js
// 验证最终路径是否在允许范围内
const resolvedPath = path.resolve(baseDir, userInput);
if (!resolvedPath.startsWith(baseDir)) {
  throw new Error('非法访问!');
}
```

---

> 通过合理使用 path 模块，可以显著提升代码的健壮性和跨平台兼容性。建议始终使用模块方法而非手动字符串操作处理路径。
