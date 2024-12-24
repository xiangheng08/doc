# windows 小技巧

## 查看端口占用

查看所有运行的端口

```sh
netstat -ano
```

查看被占用端口对应的 PID （通过 findstr 查找对应的端口的进程）

```sh
netstat -aon | findstr "8081"
```

查看指定 PID 的进程

```sh
tasklist | findstr "9088"
```

结束进程，强制（/F 参数）杀死 pid 为 9088 的所有进程包括子进程（/T 参数）：

```sh
taskkill /T /F /PID 9088
```

## win11 输入法没有候选词

1. 打开任务管理器
2. 找到 “Windows 资源管理器”
3. 右键选择 “结束任务”（这时屏幕会黑，不要慌，是正常情况）
4. 任务管理器中点击运行新任务（右上角）不小心关了任务管理器可以用 ctrl + shift + esc 打开
5. 输入：explorer.exe
6. 最后点击确定就行了

这一列流程相当于重启了 Windows 资源管理器

如果右键有“重新启动”选项（如下），直接点击效果也是一样的。

![](./images/20240129092400.png)

## win11 右下角网络、声音、电池点不开

参考：[win11 输入法没有候选词](#win11-输入法没有候选词) 步骤是一样的

## 符号链接

在 windows 上应该都知道快捷方式（快捷方式本质上是一个 .lnk 文件），符号链接基本上是高级快捷方式，指向单个文件或文件夹的符号链接。

windows 上创建符号链接，需要使用 `mklink` 命令。在 cmd 上使用 `mklink /?` 就可以看到 `mklink` 命令的用法了，如下：。

```
MKLINK [[/D] | [/H] | [/J]] Link Target

        /D      创建目录符号链接。默认为文件符号链接。
        /H      创建硬链接而非符号链接。
        /J      创建目录联接。
        Link    指定新的符号链接名称。
        Target  指定新链接引用的路径(相对或绝对)。
```

### 语法

例如，如果要在 `C:\LinkToFolder`上创建指向 `C:\Users\Name\OriginalFolder` 的符号链接，则运行以下命令：

```cmd
mklink /J C:\LinkToFolder C:\Users\Name\OriginalFolder
```

如果路径有空格，则需要使用引号包起来。

```cmd
mklink /J "C:\Link To Folder" "C:\Users\Name\OriginalFolder"
```

### 不同链接的区别

- 符号链接（Symbolic Links）
  - 符号链接是一种特殊的文件，其中包含了指向目标文件或目录的路径。
  - 它类似于快捷方式，但是更为强大，可以跨越不同的文件系统和卷。
  - 符号链接可以指向文件或目录，并且可以包含相对路径或绝对路径。
  - 符号链接可以创建指向不存在的目标，因此它可以用于创建指向尚未存在的目录的链接。
  - 图标和快捷方式一样，有个小箭头。
- 目录联接
  - 目录联接是一种特殊类型的符号链接，专门用于链接目录而不是文件。
- 硬链接（Hard Links）
  - 硬链接是文件系统中的两个或多个文件共享同一份数据块，实际上是同一个文件的不同文件名。
  - 硬链接只能指向文件，不能指向目录。
  - 删除其中一个硬链接并不会影响其他硬链接，只有当所有硬链接都被删除时，文件的数据块才会被释放。
  - 硬链接不能跨越不同的卷，因为硬链接是依赖于文件系统的 inode 和数据块的。
- 快捷方式（Shortcut）
  - 快捷方式是一个文件，但它的主要目的是提供一个链接，指向系统中的另一个文件、文件夹或应用程序。
  - 用户可以自定义快捷方式的属性，例如更改图标、添加描述等。
  - 因为快捷方式是一个文件，所以在使用一些软件打开时，只是打开了这个快捷方式的文件（.lnk），并不是指向的文件。

## 合并文件

打开 cmd 输入：`type 文件1 文件2 > 新的文件名`，**合并后的文件的格式为文件 1 的格式**

```cmd
type 文件1 文件2 > 新的文件名
```

注：此操作后 2.png 的哈希值 和 3.png 的哈希值将不一样