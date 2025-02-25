# 路径处理与工作目录

## 核心路径工具
### path 模块必用方法
```js
const path = require('path');

// 安全路径拼接（自动处理分隔符）
const fullPath = path.join(__dirname, 'data', 'file.txt');

// 解析绝对路径（相当于命令行 cd 操作）
const absolutePath = path.resolve('src', 'config.json');

// 路径规范化（处理冗余符号）
path.normalize('/var//lib/../log/'); // → /var/log
```

## 两种路径类型
### 相对路径的陷阱
```js
// 假设当前工作目录是 /home/user
fs.readFile('./data.txt', ...) // 实际查找 /home/user/data.txt
fs.writeFile('../output.log', ...) // 可能意外写入上级目录
```

### 绝对路径最佳实践
```js
// 使用 __dirname 获取当前文件所在目录
const safePath = path.join(__dirname, 'assets/photo.jpg');

// 开发环境 vs 生产环境路径差异处理
const configPath = path.resolve(
  process.env.NODE_ENV === 'production' ? '/etc/app' : './config'
);
```

## 工作目录管理
### 获取当前工作目录
```js
console.log(process.cwd()); // 输出执行 node 命令时的目录
```

### 危险操作：改变工作目录
```js
process.chdir('/tmp'); // 影响后续所有相对路径操作
console.log(process.cwd()); // → /tmp
```

### __dirname 的特殊性
```js
// 假设文件位置：/project/src/utils.js
console.log(__dirname); // → /project/src (始终返回文件所在目录)
```

## 跨平台路径处理
### Windows vs POSIX 系统
```js
// 强制生成 POSIX 风格路径
path.posix.join('dir', 'file.txt') // → dir/file.txt

// 强制生成 Windows 风格路径
path.win32.join('dir', 'file.txt') // → dir\file.txt

// 自动识别当前系统格式
path.sep // → \ (Windows) 或 / (POSIX)
```

### 路径解析演示
```js
// 在 Windows 系统执行：
path.resolve('C:\\app', '../data') // → C:\data
```

## ⚠️ 致命陷阱清单
1. **杀手级错误**：混合使用 `__dirname` 与 `process.cwd()`
   ```js
   // 错误案例：当文件被不同目录的模块引用时出错
   const badPath = path.join(process.cwd(), 'data.csv');
   ```

2. **路径注入攻击**：未净化用户输入的路径
   ```js
   // 危险！允许用户输入 ../../etc/passwd
   fs.readFileSync(path.join(__dirname, userInputPath))
   ```

3. **硬编码分隔符**：
   ```js
   // Windows 系统会失败 ↓
   const brokenPath = __dirname + '/data/file.txt';
   ```

4. **目录切换副作用**：
   ```js
   process.chdir('/tmp');
   // 后续所有模块的相对路径都会受影响！
   ```

## ✅ 最佳实践
- **黄金法则**：始终使用 `path.join()` 代替字符串拼接
- **安全检查**：对用户输入路径使用 `path.relative()` 校验是否越界
   ```js
   const safePath = path.join(__dirname, 'user_files');
   if (!path.resolve(userInput).startsWith(safePath)) {
     throw new Error('非法路径访问！');
   }
   ```
- **环境适配**：显示声明路径风格（适用于跨平台应用）
   ```js
   const configPath = path.join(__dirname, 'config', 'app.ini')
     .split(path.sep)
     .join('/'); // 统一转换为 POSIX 格式
   ```
