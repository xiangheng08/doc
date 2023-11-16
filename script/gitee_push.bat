@echo off
chcp 65001
setlocal enabledelayedexpansion

call npm run docs:build:gitee

cd docs\.vitepress\dist

call git init

call git add -A

call git commit -m "deploy"

call git push -f https://gitee.com/laowans/doc.git master:gh-pages

rd /s /q .git

cd ..\..\..\

endlocal