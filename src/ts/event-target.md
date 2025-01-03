# TypedEventTarget

`TypedEventTarget` 是扩展自 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 的强类型版本，允许通过泛型对事件名称和事件对象类型进行严格检查，从而提高类型安全性和开发体验。

```ts
// event-target.ts

export type TypedEventListenerOrTypedEventListenerObject<E extends Event = Event> =
  | TypedEventListener<E>
  | TypedEventListenerObject<E>

export interface TypedEventListenerObject<E extends Event> {
  handleEvent(object: E): void
}

export interface TypedEventListener<E extends Event> {
  (evt: E): void
}

export class TypedEventTarget<T extends Record<string, Event> = {}> extends EventTarget {
  addEventListener<K extends keyof T>(
    type: K,
    callback: TypedEventListenerOrTypedEventListenerObject<T[K]> | null,
    options?: AddEventListenerOptions | boolean,
  ) {
    super.addEventListener(type as string, callback as EventListener, options)
  }

  removeEventListener<K extends keyof T>(
    type: K,
    callback: TypedEventListenerOrTypedEventListenerObject<T[K]> | null,
    options?: EventListenerOptions | boolean,
  ) {
    super.removeEventListener(type as string, callback as EventListener, options)
  }

  dispatchEvent(event: T[keyof T]) {
    return super.dispatchEvent(event)
  }
}
```

使用示例：

```ts
// 定义事件类型
type EventMap = {
    message: MessageEvent;
    error: Event;
};

// 创建实例
const eventTarget = new TypedEventTarget<EventMap>();

// 添加监听器
eventTarget.addEventListener('message', (message) => {
    console.log(`Message received: ${message}`);
});

// 添加错误事件监听
eventTarget.addEventListener('error', (error) => {
    console.error('Error received:', error);
});

// 派发事件
eventTarget.dispatchEvent(new MessageEvent('message'));
eventTarget.dispatchEvent(new Event('error'));
```
