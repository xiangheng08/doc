# 生命周期

## 简介

Vue 组件实例的生命周期是指从创建到销毁所经历的一系列过程。在每个阶段，Vue 都会自动调用相应的[生命周期钩子函数](/vue/vue3/composition-api#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)，允许我们在特定阶段执行自定义逻辑。

## 生命周期图示

![Vue 3 生命周期](../images/lifecycle_zh-CN_vue3.png)

## 生命周期钩子

[点击查看](/vue/vue3/composition-api#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

## 注意事项

1. 在组合式 API 中，生命周期钩子需要在组件初始化时同步注册，不能在异步函数中调用：
    ```js
    // 错误示例
    setTimeout(() => {
      onMounted(() => {
        // 这将不会正常工作
      })
    }, 100)
    ```

## 相关链接

- [Vue 3 生命周期钩子官方文档](https://cn.vuejs.org/guide/essentials/lifecycle.html)
- [Vue 3 生命周期钩子 API 参考](https://cn.vuejs.org/api/composition-api-lifecycle.html)
