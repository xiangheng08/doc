# 实用小技巧

## 批量给类方法绑定 this

如果一个类中有许多方法需要绑定 this 使用，那么在它们的基础类中封装一个方法统一绑定 this 是非常好的选择。

下面的代码中，`bindHandlerThis` 方法会遍历当前类的原型链，找到所有以 `_handler` 结尾的方法，并给它们绑定 this。

注意，这里使用了 `Object.getOwnPropertyNames` 获取当前类的所有属性名，所以并不会获取到父类的属性。就是说有一个 A 类继承下面的 Base 类，那就只有 A 类中所有以 `_handler` 结尾的方法才会绑定 this，就会不会影响到父类。

```ts
class Base {
  constructor() {
    this.bindHandlerThis();
  }

  private bindHandlerThis() {
    const prototype = Object.getPrototypeOf(this);
    const propertyNames = Object.getOwnPropertyNames(prototype) as (keyof this)[];

    for (const key of propertyNames) {
      const value = this[key];
      if (key.toString().endsWith('_handler') && typeof value === 'function') {
        this[key] = value.bind(this);
      }
    }
  }
}
```

js 代码

```js
class Base {
  constructor() {
    this.bindHandlerThis();
  }

  bindHandlerThis() {
    for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      if (key.toString().endsWith('_handler') && typeof this[key] === 'function') {
        this[key] = this[key].bind(this);
      }
    }
  }
}
```
