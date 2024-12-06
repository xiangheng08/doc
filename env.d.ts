declare namespace NodeJS {
  export interface ProcessEnvExtend {
    readonly NODE_ENV?: string;
    readonly BASE_URL?: string;
    readonly COPYRIGHT?: string;
  }

  interface ProcessEnv extends ProcessEnvExtend {}
}
