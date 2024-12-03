import dotenv from 'dotenv'
import minimist from 'minimist'

interface Args extends minimist.ParsedArgs {
  readonly mode?: string
}

const args: Args = minimist(process.argv.slice(2), {
  alias: {
    m: 'mode'
  },
  string: ['m']
})

// 加载 .env 文件
dotenv.config()

// 根据环境变量加载 env 文件
if (process.env.NODE_ENV) {
  console.log(1, process.env.BASE_URL);
  dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
  })
  console.log(2, process.env.BASE_URL);
}

// 根据模式加载 env 文件
if (args.mode) {
  dotenv.config({
    path: `.env.${args.mode}`
  })
}
