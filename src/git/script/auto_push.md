# git 自动推送脚本

## windows

适用于前端项目部署在 gitee pages / github pages 的情况，或者推送到远程再在服务器拉取

> windows 推荐 bat 脚本，不需要 shell 环境，直接在 cmd 就可以运行。

新建一个 bat 文件，内容如下：

push.bat

```bat
@echo off
chcp 65001
setlocal enabledelayedexpansion

call npm run build

cd dist

call git init

call git add -A

call git commit -m "deploy"

call git push -f <你的git地址> master:gh-pages

rd /s /q .git

cd ..

endlocal
```

::: danger
脚本中不能含有中文，否则很可能会报错
:::

::: tip
执行脚本前，可以先手动把上面的命令执行一遍，确保没有问题。

有些 git：git init 默认分支可能不是 master，那就需要修改脚本中的 master:gh-pages，比如：main:gh-pages
:::

解释：

```bat
@echo off
@REM 设置编码为 UTF-8，防止中文输出时乱码
chcp 65001
setlocal enabledelayedexpansion

@REM 打包项目
call npm run build
@REM 进入输出目录
cd dist
@REM 初始化 git 仓库
call git init
@REM 全部提交暂存区
call git add -A
@REM 提交所有文件到本地仓库
call git commit -m "提交备注"
@REM -f 表示强制推送
call git push -f <你的git地址> <本地分支（一般为 master）>:<要推送到的远程分支>
@REM 删除 .git 文件夹，恢复输出目录到初始状态
rd /s /q .git
@REM 退回到上一级目录
cd ..

endlocal
```

## linux

和 bat 脚本类似，逻辑差不多，可以有中文注释

新建一个 sh 文件，内容如下：

push.sh

```sh
#!/usr/bin/env sh

set -e

npm run build

cd dist

git init

git add -A

git commit -m 'deploy'

git push -f <你的git地址> master:gh-pages

rm -rf .git

cd -
```
