# useLock

`useLock` 是一个用于锁定异步函数的钩子，确保在函数执行期间不会被重复调用。它提供了一个 `running` 状态变量，用于判断函数是否正在执行。该钩子特别适用于需要防止重复执行的场景，例如登录、注册等操作，同时也可以用于禁用按钮等 UI 控制。

通过将 `shouldLock` 参数设置为 `false`，可以仅获取函数的运行状态，而不进行锁定操作。

<<< ./lock.ts

实践：

```ts
const login = async (id: number) => { /* .... */ }

const [disabled, loginFn] = useLock(login)
```

```vue
<button :disabled="disabled" @click="loginFn()">登录</button>
```
