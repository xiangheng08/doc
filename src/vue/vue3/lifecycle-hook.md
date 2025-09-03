# 生命周期钩子

## onMounted()

注册一个回调函数，在组件挂载完成后执行。

```ts
function onMounted(
  callback: () => void, target?: ComponentInternalInstance | null
): void
```

## onUpdated()

注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用。

```ts
function onUpdated(
  callback: () => void, target?: ComponentInternalInstance | null
): void
```

## onUnmounted()

注册一个回调函数，在组件实例被卸载之后调用。

```ts
function onUnmounted(
  callback: () => void, target?: ComponentInternalInstance | null
): void
```

## onBeforeMount()

注册一个钩子，在组件被挂载之前被调用。

```ts
function onBeforeMount(
  callback: () => void, target?: ComponentInternalInstance | null
): void
```

## onBeforeUpdate()

注册一个钩子，在组件即将因为响应式状态变更而更新其 DOM 树之前调用。

```ts
function onBeforeUpdate(
  callback: () => void, target?: ComponentInternalInstance | null
): void
```

## onBeforeUnmount()

注册一个钩子，在组件实例被卸载之前调用。

```ts
function onBeforeUnmount(
  callback: () => void, target?: ComponentInternalInstance | null
): void
```

## onErrorCaptured()

注册一个钩子，在捕获了后代组件传递的错误时调用。

```ts
function onErrorCaptured(callback: ErrorCapturedHook): void

type ErrorCapturedHook = (
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string
) => boolean | void
```

## onRenderTracked()

注册一个调试钩子，当组件渲染过程中追踪到响应式依赖时调用。

```ts
function onRenderTracked(callback: DebuggerHook): void

type DebuggerHook = (e: DebuggerEvent) => void

type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
  key: any
}
```

## onRenderTriggered()

注册一个调试钩子，当响应式依赖的变更触发了组件渲染时调用。

```ts
function onRenderTriggered(callback: DebuggerHook): void

type DebuggerHook = (e: DebuggerEvent) => void

type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
  key: any
  newValue?: any
  oldValue?: any
  oldTarget?: Map<any, any> | Set<any>
}
```

## onActivated()

注册一个回调函数，若组件实例是 `<KeepAlive>` 缓存树的一部分，当组件被插入到 DOM 中时调用。

```ts
function onActivated(
  callback: () => void, target?: ComponentInternalInstance | null
): void
```

## onDeactivated()

注册一个回调函数，若组件实例是 `<KeepAlive>` 缓存树的一部分，当组件从 DOM 中被移除时调用。

```ts
function onDeactivated(
  callback: () => void, target?: ComponentInternalInstance | null
): void
```

## onServerPrefetch()

注册一个异步函数，在组件实例在服务器上被渲染之前调用。

```ts
function onServerPrefetch(callback: () => Promise<any>): void
```
