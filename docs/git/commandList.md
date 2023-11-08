# Git 命令大全

## 创建和克隆仓库

-   `git init`: 在当前目录初始化一个新的 Git 仓库。
-   `git clone <repository_url>`: 克隆远程仓库到本地。

## 基本配置

-   `git config --global user.name "Your Name"`: 配置全局用户名。
-   `git config --global user.email "youremail@example.com"`: 配置全局邮箱地址。
-   `git config --global --list`: 查看全局配置

## 增加和提交

-   `git add <file>`: 将文件添加到暂存区。
-   `git add .`: 将所有修改的文件添加到暂存区。
-   `git commit -m "Commit message"`: 提交暂存区的改动到本地仓库。

## 分支操作

-   `git branch`: 显示本地分支列表。
-   `git branch <branch_name>`: 创建新分支。
-   `git checkout <branch_name>`: 切换到指定分支。
-   `git merge <branch_name>`: 合并指定分支到当前分支。
-   `git branch -d <branch_name>`: 删除本地分支，不能删除当前分支，需要切换分支再删除。。
-   `git push <remote> --delete <branch_name>`: 删除远程分支。
-   `git branch -r`: 显示远程分支列表。

## 远程操作

-   `git remote -v`: 显示远程仓库列表。
-   `git remote add <name> <repository_url>`: 添加远程仓库。
-   `git remote rename <old_name> <new_name>`: 修改远程库名称
-   `git remote rm <name>`: 删除远程库
-   `git pull <remote> <branch>`: 从远程仓库拉取最新代码。
-   `git pull --force <remote> <branch>`: 强制拉取远程仓库最新代码，覆盖本地。
-   `git push <remote> <branch>`: 推送本地分支到远程仓库。
-   `git fetch <remote>`: 获取远程仓库的最新信息，但不合并。
-   `git clone <remote>`: 克隆远程仓库到本地。
-   `git push 别名 | 远程地址 --d 分支名`
-   `git push <remote> --delete <branch_name>`: 删除远程分支。

## 查看状态和历史

-   `git status`: 显示工作区和暂存区的状态。
-   `git log`: 查看提交历史。
-   `git log --oneline`: 查看简化的提交历史。
-   `git diff`: 查看工作区和暂存区的差异。
-   `git diff <commit1> <commit2>`: 查看两个提交之间的差异。
-   `git reflog`: 查看操作历史。

## 撤销和重置

-   `git reset <file>`: 取消对文件的暂存。
-   `git reset`: 取消对所有文件的暂存。
-   `git reset --hard <commit>`: 重置 HEAD 到指定的提交，丢弃所有改动。
-   `git checkout <file>`: 恢复文件到最近一次提交的状态。
-   `git reset --hard HEAD`：将当前分支重置为最新的提交，删除工作目录中未提交的更改。

## 标签

-   `git tag <tag_name>`: 创建标签。
-   `git tag -a <tag_name> -m "Tag message"`: 创建带注释的标签。
-   `git push --tags`: 推送所有标签到远程仓库。
-   `git show <tag_name>`: 查看标签信息。

## 其他

-   `git --version`: 显示 git 版本。
-   `git stash`: 暂存当前的工作，将修改保存到一个栈中。
-   `git stash pop`: 恢复最近一次暂存的工作。
-   `git clean -n`: 预览并清除工作区的未跟踪文件。
-   `git clean -f`: 清除工作区的未跟踪文件（慎用）。

## 命令集

### 配置默认的推送远程地址

`git push --set-upstream <remote> <branch>`

此操作会推送一次，`<branch>` 为本地分支名，一般为当前分支

例如
```sh
git push --set-upstream origin main

```

### 配置默认的拉取远程地址

`git branch --set-upstream-to=<remote>/<remote_branch> <branch>`

```sh
# 例如，将 origin 的 main 分支默认拉取到本地的 main分支
git branch --set-upstream-to=origin/main main
```

### 开启大小写敏感

```sh
# 查看当前项目大小写忽略状态
git config --get core.ignorecase
git config --global --get core.ignorecase

# 开启大小写敏感
git config core.ignorecase false
git config --global core.ignorecase false

```

### 不跟踪文件权限

linux 上 clone 下来的仓库，可能因为改了权限，导致 git status 显示一堆文件被修改，这个就是因为 git 默认跟踪了文件权限

```sh
# filemode=true 表明跟踪了文件权限
cat .git/config
```

```sh
git config core.filemode false
```

### 创建空白分支

记得在这个分支提交一下，不然使用 `git branch` 看不到

`git checkout --orphan <branch_name>`

### 生成.ssh 秘钥目录

`ssh-keygen -t rsa -C "youremail@example.com"`

注意：这里-C 这个参数是大写的 C）

### 取消 git 的版本控制

`find . -name ".git" | xargs rm -Rf`

此操作将删除以前的提交记录（慎用）

## 关键词

-   `--global`: 全局
-   `--force`: 强制
