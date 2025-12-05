# Git 提交规范

良好的提交信息规范有助于团队协作和项目维护。本文档介绍了通用的 Git 提交规范。

## 提交信息格式

每次提交的信息应该清晰地表达本次提交的目的和变更内容。标准的提交信息包括三个部分：`header`、`body` 和 `footer`。

```
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

其中 header 是必须的，body 和 footer 是可选的。任何一行都不能超过 72 个字符（除非需要包含超长链接）。

### Header

Header 只有一行，包含三个字段：`type`（必需）、`scope`（可选）和 `subject`（必需）。

```
<type>(<scope>): <subject>
```

#### Type 类型

常见的 type 类型包括：

- **feat**: 新功能（feature）
- **fix**: 修复 bug
- **docs**: 文档变更
- **style**: 代码格式调整（不影响代码运行的变动）
- **refactor**: 重构（既不是新增功能，也不是修改 bug 的代码变动）
- **perf**: 性能优化相关
- **test**: 增加测试
- **chore**: 构建过程或辅助工具的变动
- **revert**: 回滚到上一个版本
- **build**: 影响构建系统或外部依赖的更改（如 gulp、npm）
- **ci**: 对 CI 配置文件和脚本的更改（如 Travis、Circle、BrowserStack）

#### Scope 范围

Scope 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

例如在 Angular 项目中可以是：
- `$location`
- `$browser`
- `$compile`
- `$rootScope`
- `ngHref`
- `ngClick`
- `ngView`
等等...

如果你的修改影响了多个范围，可以使用 `*` 表示。

#### Subject 主题

Subject 是对本次提交的简短描述，需要注意：

- 使用祈使句、现在时态（如使用 "change" 而不是 "changed" 或 "changes"）
- 首字母不要大写
- 结尾不加句号（.）

### Body 正文

Body 部分是对本次提交的详细描述，可以分为多行。需要注意：

- 使用祈使句、现在时态（如使用 "change" 而不是 "changed" 或 "changes"）
- 应该说明代码变动的原因，以及与之前行为的对比

例如：
```
More detailed explanatory text, if necessary. Wrap it to about 72
characters or so.

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Typically a hyphen or asterisk is used for the bullet, preceded
  by a single space, with blank lines in between, but conventions
  vary here
```

### Footer 脚注

Footer 用于两种情况：

1. 不兼容的变更
2. 关闭 Issue

#### 不兼容变更

所有不兼容的变更都必须在 Footer 区域进行说明，以 `BREAKING CHANGE:` 开头，后面是对变动的描述、变动理由和迁移方法。

```
BREAKING CHANGE: isolate scope bindings definition has changed and
the inject option for the directive controller injection was removed.

To migrate the code follow the example below:

Before:

scope: {
  myAttr: 'attribute',
  myBind: 'bind',
  myExpression: 'expression',
  myEval: 'evaluate',
  myAccessor: 'accessor'
}

After:

scope: {
  myAttr: '@',
  myBind: '@',
  myExpression: '&',
  // myEval - usually not useful, but in cases where the expression is assignable, you can use '='
  // myAccessor - not usually useful, 'accessor' is usually used with getter/setter pairs
}
```

#### 关闭 Issue

如果当前提交针对某个 issue，那么可以在 Footer 部分关闭这个 issue。

```
Closes #123, #245, #992
```

## Revert 操作

如果需要撤销之前的提交，需要使用 revert 指令并在 header 中指明被撤销的 commit 的 SHA 标识。

格式如下：

```
revert: <header of the reverted commit>

This reverts commit <SHA>.
```

其中 body 部分的格式是固定的，必须写成 `This reverts commit <SHA>.`。

## 示例

### 简单提交

```
feat(login): add 'remember me' option
```

### 带有正文和脚注的提交

```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.

Closes #123
```

### 不兼容变更的提交

```
feat(toh): add hero list component

Closes #222

BREAKING CHANGE: heroes service is removed and replaced with a simple
heroes array. The hero list component now takes a heroes input rather
than fetching the heroes itself.
```

## 最佳实践

1. **及时提交**：发现代码变更就立即提交，避免大量变更堆积在一起
2. **小幅度提交**：每次提交应尽量保持较小粒度，便于追踪和回滚
3. **明确描述**：提交信息应准确反映所做的变更，避免模糊不清的描述
4. **统一语言**：在一个项目中保持提交信息的语言一致（通常是英文或项目规定的语言）
5. **关联任务**：如果使用了任务管理系统，应在提交信息中引用相关的任务编号

## 工具支持

为了更好地遵循这些规范，可以使用以下工具：

- [Commitizen](https://github.com/commitizen/cz-cli)：一个撰写合格 Commit message 的工具
- [Commitlint](https://github.com/conventional-changelog/commitlint)：检查 Commit message 是否符合规范的工具
- [Husky](https://github.com/typicode/husky)：Git hooks 工具，可用于提交前检查

这些工具可以帮助团队更轻松地遵循提交规范，提高代码审查效率。