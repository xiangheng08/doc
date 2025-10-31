/**
 * 判断 File 对象是否是矢量图
 */
export function isVectorImage(file: File): boolean {
  return file.type.startsWith('image/svg')
}
