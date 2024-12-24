/*
  加载 env
*/
import dotenv from 'dotenv'
import minimist from 'minimist'

interface Args extends minimist.ParsedArgs {
  readonly mode?: string
}

const args: Args = minimist(process.argv.slice(2), {
  alias: {
    m: 'mode',
  },
  string: ['m'],
})

const commandNodeEnvMap = {
  dev: 'development',
  build: 'production',
  preview: 'production',
}

type Keys = keyof typeof commandNodeEnvMap

const commandNodeEnv = commandNodeEnvMap[args._[0] as Keys]

if (process.env.NODE_ENV === void 0 && commandNodeEnv) {
  /*
    如果 NODE_ENV 的值为 undefined，则设置 NODE_ENV 的值为 commandNodeEnv
    保证 .env[NODE_ENV] 文件被加载
  */
  // @ts-ignore
  process.env.NODE_ENV = commandNodeEnv
}

// 加载 .env 文件
dotenv.config()

// 加载 .env[NODE_ENV] 文件
if (process.env.NODE_ENV) {
  dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
  })
}

// 加载 .env[mode] 文件
if (args.mode) {
  dotenv.config({
    path: `.env.${args.mode}`,
  })
}

export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV === 'production'
export const noSearch = args.search === false
