# 常用函数

## 观察元素大小的变化 {#observeResize}

<<< ./observer-resize.ts

## 观察元素可见性的变化 {#ObserverIntersection}

<<< ./observer-intersection.ts

## 防抖

```ts
export function debounce<T extends any[], R, THIS>(
  this: THIS,
  fn: (...args: T) => R,
  wait?: number
): (...args: T) => void {
  let timeout: ReturnType<typeof setTimeout>
  return function (this: THIS, ...args: T) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}
```

## lodash 版节流

```ts
type ThrottleOptions = {
  leading?: boolean;
  trailing?: boolean;
};

function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: ThrottleOptions = {}
): (...args: Parameters<T>) => ReturnType<T> | void {
  let lastExecTime: number | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let storedArgs: Parameters<T> | undefined;
  let storedThis: any;

  // 处理默认选项并确保至少有一个触发选项
  let { leading = true, trailing = true } = options;
  if (!leading && !trailing) {
    trailing = true;
  }

  // 清理定时器并重置状态
  const clearTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  // 执行 trailing 调用
  const trailingExec = () => {
    lastExecTime = Date.now();
    clearTimer();
    if (trailing && storedArgs) {
      func.apply(storedThis, storedArgs);
      storedArgs = undefined;
      storedThis = undefined;
    }
  };

  return function (this: any, ...args: Parameters<T>): ReturnType<T> | void {
    const now = Date.now();
    
    // 计算剩余时间
    const remaining = lastExecTime === undefined
      ? 0
      : wait - (now - lastExecTime);

    // 保存当前调用的上下文和参数
    storedArgs = args;
    storedThis = this;

    if (remaining <= 0) {
      clearTimer();
      lastExecTime = now;
      if (leading) {
        return func.apply(storedThis, storedArgs);
      }
    } else if (!timeoutId && trailing) {
      timeoutId = setTimeout(trailingExec, remaining);
    }

    // 非 leading 调用或无立即执行时返回 undefined
    return undefined;
  };
}
```

## hasOwnProperty

```ts
const rawHasOwnProperty = Object.prototype.hasOwnProperty

export const hasOwnProperty = <T extends object, K extends PropertyKey>(
  obj: T,
  key: K,
): boolean => rawHasOwnProperty.call(obj, key)

export const hasOwnProperties = <T extends object, K extends PropertyKey>(
  obj: T,
  keys: K[],
): boolean => keys.every(key => hasOwnProperty(obj, key))

export const hasOwnOrProperties = <T extends object, K extends PropertyKey>(
  obj: T,
  keys: K[],
): boolean => keys.some(key => hasOwnProperty(obj, key))
```

## 挑选属性 Pick

```ts
export const pickProperties = <T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
) => {
  const uniqueKeys = Array.from(new Set(keys))
  return uniqueKeys.reduce(
    (acc, key) => {
      if (key in obj) {
        acc[key] = obj[key]
      }
      return acc
    },
    {} as Pick<T, K>,
  )
}
```

## 排除属性 Omit

```ts
export const omitProperties = <T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
) => {
  const uniqueKeys = Array.from(new Set(keys))
  return uniqueKeys.reduce(
    (acc, key) => {
      delete acc[key]
      return acc
    },
    Object.assign({}, obj),
  ) as Omit<T, K>
}
```

## 修改所有属性的值 Record {#record}

```ts
export const record = <T extends Record<string | number | symbol, any>, V>(
  obj: T,
  value: V,
): Record<keyof T, V> => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      acc[key as keyof T] = value
      return acc
    },
    {} as Record<keyof T, V>,
  )
}
```

## 获取错误信息字符串 {#getErrorMessage}

<<< ./get-error-message.ts

## 格式化金额 {#formatAmount}

<<< ./format-amount.ts

## 数字千位分隔符 {#addThousandsSeparator}

<<< ./add-thousands-separator.ts

## 格式化字节 {#formatBytes}

[另一个](/nodejs/functions#格式化字节)

<<< ./format-bytes.ts

## 格式化用时 {#formatDuration}

[另一个](/js/functions/#格式化用时)

<<< ./format-duration.ts

## 选择文件 {#selectFile}

[js 实现](/js/functions/#选择文件)

<<< ./select-file.ts

## 加载图片 {#loadImage}

<<< ./load-image.ts

## 获取图片平均色 {#getImageAverageColor}

[loadImage](#loadImage)

<<< ./get-image-average-color.ts

## 获取图片大小 {#getImageDimensions}

[loadImage](#loadImage)

<<< ./get-image-dimensions.ts

## 是否为矢量图 {#isVectorImage }

<<< ./is-vector-image.ts

## Canvas 转 Blob {#canvasToBlob}

<<< ./canvas-to-blob.ts

## Blob 转 Base64 {#blobToBase64}

<<< ./blob-to-base64.ts

## RGB 转 HSL {#rgbToHsl}

<<< ./rgb-to-hsl.ts

## HSL 转 RGB {#hslToRgb}

<<< ./hsl-to-rgb.ts

## 只处理一次错误 {#handleUniqueError}

安全地处理错误，避免重复处理同一错误实例

<<< ./handle-unique-error.ts

## Github 相关方法 {#github}

<<< ./github.ts

## NPM 相关方法  {#npm}

<<< ./npm.ts

## 分步执行任务 {#performTask}

<<< ./perform-task.ts
