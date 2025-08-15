# 修饰符

## 事件修饰符

- `.stop` - 阻止事件继续传播（等同于 event.stopPropagation()）
- `.prevent` - 阻止默认事件（等同于 event.preventDefault()）
- `.capture` - 使用事件捕获模式
- `.self` - 只当事件在该元素本身（而不是子元素）触发时触发回调
- `.once` - 事件只触发一次（2.1.4+）
- `.passive` - 以 { passive: true } 模式添加事件监听器（2.3.0+）

## 按键修饰符

- `.enter` - 回车键
- `.tab` - Tab 键
- `.delete` - 删除键和退格键
- `.esc` - Esc 键
- `.space` - 空格键
- `.up` - 上箭头
- `.down` - 下箭头
- `.left` - 左箭头
- `.right` - 右箭头

## 系统修饰键

- `.ctrl` - Ctrl 键
- `.alt` - Alt 键
- `.shift` - Shift 键
- `.meta` - Windows 徽标键/Mac Command 键

## 鼠标按钮修饰符（2.2.0+）

- `.left` - 鼠标左键
- `.right` - 鼠标右键
- `.middle` - 鼠标中键

## 精确修饰符

- `.exact` - 精确控制系统修饰键组合（2.5.0+）

## 注意事项

1. 修饰符可以串联使用：`.stop.prevent`
2. `.passive` 和 `.prevent` 不能一起使用
3. 修饰符顺序会影响执行结果
4. `.passive` 修饰符可提升移动端性能
