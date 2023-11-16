#!/usr/bin/env sh

set -e

npm run docs:build:gitee

cd docs/.vitepress/dist

git init

git add -A

git commit -m 'deploy'

git push -f https://gitee.com/laowans/doc.git master:gh-pages

rm -rf .git

cd -
