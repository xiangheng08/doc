import ms from 'ms'
import { config } from 'dotenv'
import { cleanEnv, str, email, json, bool, makeValidator } from 'envalid'

// .env
config()

if (process.env.NODE_ENV) {
  // .env.development / .env.production / .env.test / ...
  config({ path: `.env.${process.env.NODE_ENV}` })
  // 本地配置 .env.development.local / ...
  config({ path: `.env.${process.env.NODE_ENV}.local` })
}

// 自定义时长验证器
const duration = makeValidator<number>((s) => ms(s as ms.StringValue))

// 使用 cleanEnv 验证环境变量
const env = cleanEnv(process.env, {
  API_KEY: str(),
  ADMIN_EMAIL: email({ default: 'admin@example.com' }),
  EMAIL_CONFIG_JSON: json({ desc: 'Additional email parameters' }),
  NODE_ENV: str({
    choices: ['development', 'test', 'production', 'staging'],
  }),
  CORS: str(),
  SOCKET_IO: bool(),
  TOKEN_EXPIRY: duration(),
  PRIVATE_KEY: str(),
})

console.log(env)
