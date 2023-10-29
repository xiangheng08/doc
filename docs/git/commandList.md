# Git 命令大全

## git 配置

```sh
# 查看全局配置
git config --global --list

# 设置用户名
git config --global user.name 用户名

# 设置邮箱
git config --global user.email 邮箱
```

## 本地

```sh
# 看本地库状态
git status

# 添加到暂存区
git add 文件名 | 目录名 | *

# 提交本地库
git commit -m "日志信息" 文件名 | 目录名 | * | 不写

# 查看历史记录
git reflog

# 查看详细历史记录
git log

# 版本穿梭
git reset 版本号
```

## 分支

```sh
# 创建分支
git branch 分支名

# 切换分支
git checkout 分支名

# 查看分支
git branch -v

# 把指定的分支合并到当前分支上
git merge 分支名

# 删除本地分支
git branch -d 分支名

# 删除远程分支
git push 别名 | 远程地址 --d 分支名

# 创建空白分支，记得在这个分支提交一下，不然使用 git branch -v 看不到
git checkout --orphan 分支名
```
::: warning 注意
删除本地分支时，不能删除当前分支，需要切换分支再删除。
:::


## 远程

```sh
# 添加远程库
git remote add 别名 远程地址

# 查看远程库
git remote -v

# 修改远程库
git remote rename 旧别名 新别名

# 删除远程库
git remote rm 别名

# 推送到远程库
git push 别名 | 远程库地址 分支名

# 克隆远程到仓库到本地
git clone 别名 | 远程地址

# 拉取远程库
git pull 别名 | 远程库地址 分支名

# 强制覆盖本地的分支
git pull --force 别名 | 远程库地址 分支名
```

## 其他

```sh
# 查看git版本
git --version

# 生成.ssh 秘钥目录[注意：这里-C 这个参数是大写的 C]
ssh-keygen -t rsa -C 设置的邮箱

# 取消git的版本控制（此操作将删除以前的提交记录）
find . -name ".git" | xargs rm -Rf 
```