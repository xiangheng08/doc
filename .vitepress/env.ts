import { loadEnv } from 'vitepress'

const ModeMap = {
  DEV: 'development',
  PROD: 'production',
} as const

const commandNodeEnvMap = {
  dev: ModeMap.DEV,
  build: ModeMap.PROD,
  preview: ModeMap.PROD,
}

const command = process.argv[2] as keyof typeof commandNodeEnvMap
const mode = commandNodeEnvMap[command]
const isDev = mode === ModeMap.DEV
const isProd = mode === ModeMap.PROD

const env = loadEnv(mode, process.cwd(), 'APP_')

const BASE_URL = env.APP_BASE_URL
const COPYRIGHT = env.APP_COPYRIGHT

export { command, mode, isDev, isProd, BASE_URL, COPYRIGHT }
