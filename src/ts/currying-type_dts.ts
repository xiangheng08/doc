type Curried<P extends any[], R> = P extends []
  ? () => R
  : P extends [infer F]
  ? (arg: F) => R
  : P extends [infer F, ...infer Rest]
  ? (arg: F) => Curried<Rest, R>
  : never

declare function curry<P extends any[], R>(fn: (...args: P) => R): Curried<P, R>
