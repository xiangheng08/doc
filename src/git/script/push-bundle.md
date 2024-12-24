# git pull 不报错的推送脚本

```bat
@echo off
chcp 65001
setlocal enabledelayedexpansion

@REM 设置目标目录、远程、分支、提交信息、打包脚本
set TARGET_DIR=".\dist"
set TARGET_REMOTE="origin"
set TARGET_BRANCH="bundle"
set COMMIT_MESSAGE="bundle"
set BUNDLE_SCRIPT="pnpm build"

@REM 尝试获取当前 Git 仓库的远程地址
for /f "delims=" %%i in ('call git remote get-url %TARGET_REMOTE% 2^>nul') do set "REMOTE_URL=%%i"

@REM 检查是否成功获取
if not defined REMOTE_URL (
  echo [ERROR] Failed to get the remote URL of the Git repository.
  echo Please ensure you are in a valid Git repository and %TARGET_REMOTE% is configured.
  pause
  exit /b 1
)

@REM 输出获取到的远程地址
echo Remote URL: %REMOTE_URL%

@REM 删除旧的目录
if exist %TARGET_DIR% (
  echo Removing old %TARGET_DIR% directory...
  rd /s /q %TARGET_DIR%
)

@REM 使用 git ls-remote 检查分支
for /f "tokens=*" %%i in ('call git ls-remote %TARGET_REMOTE% refs/heads/%TARGET_BRANCH% 2^>nul') do (
  set FOUND_BRANCH=%%i
)

@REM 判断是否找到分支
if defined FOUND_BRANCH (
  echo Remote branch %TARGET_BRANCH% exists

  @REM 克隆分支到指定目录
  call git clone %REMOTE_URL% --branch %TARGET_BRANCH% %TARGET_DIR%

  @REM 打包项目
  call pnpm build

  cd %TARGET_DIR%

  @REM 提交推送
  call git add -A
  call git commit -m "%COMMIT_MESSAGE%"
  call git push
) else (
  echo Remote branch %TARGET_BRANCH% does not exist
  
  @REM 打包项目
  call %BUNDLE_SCRIPT%

  cd %TARGET_DIR%

  @REM 初始化 Git 仓库并提交推送
  call git init --initial-branch=%TARGET_BRANCH%
  call git add -A
  call git commit -m "%COMMIT_MESSAGE%"
  call git push --set-upstream %REMOTE_URL% %TARGET_BRANCH%
)

rd /s /q .git

cd ..

endlocal
```
