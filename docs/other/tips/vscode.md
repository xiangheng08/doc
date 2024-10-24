# vscode 小技巧

## 取消输入括号或点时自动补全

有时候 vscode 的自动补全可能会发风，补全一些毫不相干的东西，很影响写代码的体验。这样就算了，主要是我写着代码，输一个点直接把我写好的单词替换掉了，替换的东西还和我写的不相干（比如 proxy 我想点里面的东西，直接把 proxy 替换成 isProxy，这完全就不相干啊，还有其他的，不过这个记住了，其他的没记住，基本上随便写点啥都能整出一大推提示，还不相干），然后又的回退再写，有时候写完一看一边红啊，红彤彤的，后面一查，好几个变量名方法名，都替换成别的了，又得改！真的影响体验！当时连代码都不写了，把这个关闭自动补全的方法搜出来了。

在设置中取消输入提交字符自动补全的功能。步骤如下：

1. 设置
2. 文本编辑器(文本编辑器)
3. 建议(Suggestions)
4. 将 Accept Suggestion On Commit Character 取消勾选

或者使用[重新加载窗口](#重新加载窗口)

## 重新加载窗口

在 vscode 里，有时候会某些功能失效（比如：类型提示没有了），可以通过重新加载窗口来解决。

-   使用 ctrl + shift + p 打开命令面板（或者在帮助->显示所有命令）
-   输入 reload
-   选择 Reload Window（重新加载窗口）

## 路径别名提示

如果不是 ts 项目的情况下，在 vue.config.js 或者是其他打包工具中配置了路径别名，但是 vscode 没有提示，这时候需要在项目根目录新建 jsconfig.json 内容如下。

```json
{
	"compilerOptions": {
		"baseUrl": ".",
		"paths": {
			"@/*": ["./src/*"]
		}
	},
	"exclude": ["node_modules", "dist"]
}
```

其中 paths 属性中就是路径别名，需要其他的别名，可以按照以上格式修改。

如果是 ts 项目，配置内容是一样的，只是在 tsconfig.json 中配置

## vscode 复制相对路径时将改为反斜杠\，改为正斜杠/

1. 打开 vscode 设置
2. 在搜索框中输入 `explorer.copyRelativePathSeparator`

![](/images/other/tips/vscode/copyRelativePathSeparator.png)

## vscode 设置悬浮提示相关设置

1. 设置搜索 `editor.hover`

- `editor.hover.hidingDelay` 悬浮提示消失时间
- `editor.hover.delay` 悬浮提示出现时间
