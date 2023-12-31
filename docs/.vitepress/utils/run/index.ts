// 运行时


/**
 * 小驼峰转短横线分隔格式
 */
export function camelToKebab(camelCase: string) {
  return camelCase.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}