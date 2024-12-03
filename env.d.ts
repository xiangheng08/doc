declare namespace NodeJS {
  export interface ProcessEnvExtend {
    readonly NODE_ENV?: string;
    readonly BASE_URL?: string;
  }

  interface ProcessEnv extends ProcessEnvExtend {}
}
