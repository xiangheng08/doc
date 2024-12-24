# 环境变量

了解环境变量之前，我们应该先了解下什么是环境，环境，顾名思义，所处的地方/位置，我们的项目在不同环境，需要不同的配置（例如项目在本地开发，则需要更多的日志信息直接输出，连接本地数据库，前端项目也需要请求开发服务器。但是在服务器中，不需要那么多的日志信息直接输出，更多的是保存在日志文件中，同时也需要连接服务器的数据库，或者云数据库，而前端项目也需要请求服务器，而不是开发服务器），针对不同环境，就需要环境变量来区分，不同环境，这就是环境变量的作用。

一般环境有:

- `development`: 开发环境
- `test`: 测试环境
- `production`: 生产环境

当然真实的项目可能远不止这些环境

## 配置环境变量

配置环境变量一般是项目启动时，即运行项目启动命令时，通过在启动命令中，设置环境变量，区分项目不同的行为。

在 Linux 中可以使用 `export` 命令来设置临时的环境变量，在终端中可以运行以下命令来设置环境变量

```bash
export NODE_ENV=development
```

而在 windows 中，可以使用 `set` 命令来设置环境变量

```bash
set NODE_ENV=development
```

设置完了环境变量，就可以启动项目了。注意哦，这里只是临时设置，当关闭终端后，环境变量就失效了，所以我们需要在同一终端启动项目。

如果有多个环境变量，把上面的命令执行多次即可。

## 在 package.json 的 script 中设置环境变量

```json
{
  "scripts": {
    // 单个
    "dev": "set NODE_ENV=production && node index.js",
    // 多个
    "dev2": "set NODE_ENV=production && set LOAD_DEV=app-plus && node index.js"
  }
}
```

这里只演示了 Windows 的做法，如果是 Linux，只需要把 `set` 改成 `export` 即可。

## 读取环境变量

在 NodeJS 中有一个全局对象 `process`，它有一个属性 `env`，这个属性是一个对象，里面保存了所有的环境变量（也包括刚刚设置的环境变量）。

```js
console.log(process.env.NODE_ENV);

/*
  注意注意！
  读取环境变量是后面一定加上 `.trim()`，因为设置环境变量时为了区分，
  可能会使用空格分隔，这就导致了读取的环境变量会有空格，如果不加 `.trim()`，
  到时候时间就容易出错。
 */
/* 
  防止环境变量为空，最好给个默认值，一般的话为生产环境的值，这样生产环境忘记设了，
  也不会出错。
*/

// 使用 可选链可选链运算符 + 空值合并运算符
const NODE_ENV = process.env.NODE_ENV?.trim() ?? 'production';

// 三元表达式
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'production';
```

既然有了环境变量，区分项目不同的行为，就非常简单了，写一些分支语句就行了。

一般来说，环境变量都是常量，所以一般为全大写，下划线分隔单词，如 `NODE_ENV`，当然了自己的项目想咋取就咋取，只要不跟系统环境变量冲突就行。

::: warning 注意
注意每个环境变量的值的类型都是 string，如果需要不同类型的值，需要自己转换
:::

## 使用 cross-env 设置环境变量

你可能发现了，在 Linux 和 Windows 中设置环境变量的方式不一样，一个是 `export`，一个是 `set`，要是再服务器上，没有注意弄错了，那又得一顿排查，所以我们需要一个统一的设置环境变量的方式。

这里使用 `cross-env` 这个库，它支持在 Linux 和 Windows 中设置环境变量。

### 安装

::: code-group

```sh [npm]
npm i -D cross-env
```

```sh [cnpm]
cnpm i -D cross-env
```

```sh [yarn]
yarn add -D cross-env
```

```sh [pnpm]
pnpm add -D cross-env
```

:::

### 使用

```json
{
  "scripts": {
    // 单个
    "build1": "cross-env NODE_ENV=production node ./index.js",
    // 多个
    "build2": "cross-env FIRST_ENV=one SECOND_ENV=two node ./index.js"
  }
}
```

每个环境变量之间用空格隔开，最后一个是项目的启动命令。

如果项目的启动命令，是多个命令组合或需要带参，那可以将启动命令单独分离出去。

```json
{
  "scripts": {
    // 启动命令
    "start": "cross-env FIRST_ENV=one SECOND_ENV=two npm run dev",
    // 项目的启动命令
    "dev": "node ./script/before.js && node ./index.js --c"
  }
}
```

## 使用 env 文件

当然，在实际开发中，我们可能需要设置很多环境变量，如果每次都手动设置环境变量，那未免太麻烦了，就算是在 package.json 的 script 中设置，一个两个还好，多了也影响阅读。可以使用 env 文件，将所有的环境变量都写入 env 文件中（一般会留一个环境变量用于区分主要的环境），然后使用 `dotenv` 读取。

### 安装

::: code-group

```sh [npm]
npm i dotenv
```

```sh [cnpm]
cnpm i dotenv
```

```sh [yarn]
yarn add dotenv
```

```sh [pnpm]
pnpm add dotenv
```

:::

### 基本使用

我们在项目的根目录新建的 `.env` 文件，在这个文件写对应的环境变量（[env 文件语法](#env-文件语法)），然在项目的入口文件的首行添加以下代码

```js
require('dotenv').config();
```

`dotenv` 默认读取项目根目录 `.env` 文件中的环境变量。

然后正常使用 `process.env.xxx` 读取就行了

### 读取指定文件

```js
const path = require('path');
const dotenv = require('dotenv');

const config = dotenv.config({ path: path.join(__dirname, './env/.env') });

// 返回值就是这个文件的环境变量
console.log(config);
```

### 自己读取文件

```js
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const buf = fs.readFileSync(path.join(__dirname, './env/.env'));

const config = dotenv.parse(buf);

console.log(config);
```

`dotenv.parse` 方法可以接受 `string` 或者 `buffer` 类型的参数，返回值就是 env 文件中的环境变量组成的对象。

### 根据主环境变量读取

在很多的项目里都有 `.env.development` 和 `.env.production` 这两个文件，分别用于开发环境和生产环境。

为了不同环境读取不同的文件，可以使用 `NODE_ENV` 环境变量，根据 `NODE_ENV` 的值，读取不同的 env 文件。

- 如果 `NODE_ENV` 等于 `development` 读取 `.env.development`。

- 如果 `NODE_ENV` 等于 `production` 读取 `.env.production`。

```js
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// 加载路径
const loadPath = path.resolve(process.cwd(), 'env');

// 根据 NODE_ENV 的值，读取不同的 env 文件
if (process.env.NODE_ENV?.trim()) {
  const filePath = path.join(loadPath, '.env.' + process.env.NODE_ENV.trim());
  // 判断文件是否存在
  if (fs.existsSync(filePath)) {
    dotenv.config({ path: filePath });
  }
}
```

## env 文件语法

为了有语法高亮效果，这里使用 sh 作为以下代码的语言，因为 sh 语法和 env 语法基本一样（虽然 sh 和 env 的语法差不多，但它们的功能是不一样的，但还是要区分一下子的）。

### 键值对

`.env` 文件由一系列键值对组成，用等号（=）连接键和值。例如：

```sh
KEY=VALUE
```

### 注释

可以使用 `#` 符号添加注释。注释后面的内容将被忽略。例如：

```sh
# 这是一个注释
DATABASE_URL=mysql://user:password@localhost:3306/db_name
```

### 空白行

空白行会被忽略。

### 引号

在值的两侧可以使用单引号（'）或双引号（"）来包裹字符串，以保留其中的空白字符。例如：

```sh
API_KEY='my_secret_key'
```

或者

```sh
API_KEY="my_secret_key"
```

### 转义字符

如果在值中需要包含特殊字符，可以使用反斜杠（\）进行转义。例如：

```sh
SPECIAL_CHAR=This\ is\ a\ value\ with\ spaces
```

### 换行符

如果值中包含换行符，可以使用 `\n` 表示。例如：

```sh
MULTI_LINE=This is a multi-line\nvalue
```

### 多行文本

使用 `"` 或 `'` 包裹的字符串，可以换行。例如：

```sh
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
Kh9NV...
...
-----END RSA PRIVATE KEY-----"
```

### 环境变量的引用

在值中引用其他环境变量时，可以使用 `${}` 语法。例如：

```sh
BASE_URL=https://example.com
FULL_URL=${BASE_URL}/path
```

这些规则使得`.env`文件易于阅读和编辑，同时提供了一种将配置参数传递给应用程序的便捷方式。请注意，`.env`文件中存储的信息通常包含敏感数据，因此应妥善保管，避免将其版本控制或分享到不安全的地方。
