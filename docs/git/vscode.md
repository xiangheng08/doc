# 与 vscode 联动

vscode 原生就是支持 git 的，而且是图形化操作，点点鼠标就行了，对于更改的文件和暂存区的文件，会以列表的形式展现出来的，非常的直接。如果需要更多的功能，则需要安装一些插件。

在 vscode 的侧边栏，有一个 git 的标志，这个就是啦。

<!-- ![vscode1](/images/git/vscode/vscode1.png) -->

<img src="/images/git/vscode/vscode1.png" alt="vscode1" style="margin: auto;"/>


这个是它的初始化状态

<img src="/images/git/vscode/vscode2.png" alt="vscode2" style="margin: auto;"/>

初始化完了就是这样子

<img src="/images/git/vscode/vscode21.png" alt="vscode21" style="margin: auto;"/>

## 错误

### vscode 识别不到 git

电脑明明安装了 git 电脑识别不出来，就像下图这样

<img src="/images/git/vscode/vscode3.png" alt="vscode3" style="margin: auto;"/>

这个呢是因为，电脑虽然安装了 git 但是 vscode 他不知道啊，也可能是一些系统的环境变量没有配置。解决办法就是告诉他，git 的路径在哪里。

点击 左上角文件 -> 首选项 -> 设置

<img src="/images/git/vscode/vscode4.png" alt="vscode4" style="margin: auto;"/>

在上方的搜索框输入 git.path，点击 在 settings.json 中编辑

<img src="/images/git/vscode/vscode5.png" alt="vscode5" style="margin: auto;"/>

在里面加入 ` "git.path": "git的安装位置/bin/git.exe"` 配置项

<img src="/images/git/vscode/vscode6.png" alt="vscode6" style="margin: auto;"/>

找不到 git 的安装位置没关系，打开 Git Bash Here 命令行工具，输入 where git 就出来了

<img src="/images/git/vscode/vscode7.png" alt="vscode7" style="margin: auto;"/>

配置完成，保存并关闭 vscode ，再次打开 vscode ，就可以了