/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ISSUES_URL?: string
  readonly VITE_PR_URL?: string
  readonly VITE_REPOSITORY_URL?: string
}

declare namespace NodeJS {
  export interface ProcessEnvExtend {
    readonly NODE_ENV?: string
    readonly BASE_URL?: string
    readonly COPYRIGHT?: string
  }

  interface ProcessEnv extends ProcessEnvExtend {}
}
