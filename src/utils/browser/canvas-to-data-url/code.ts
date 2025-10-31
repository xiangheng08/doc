/**
 * Canvas 转 DataURL
 * @param canvas 需要转换的 HTMLCanvasElement 元素
 * @param type MIME 类型（如 'image/png', 'image/jpeg' 等）
 * @param quality 图像质量，取值范围 0-1
 * @example
 * const url = await canvasToDataURL(canvas, 'image/png', 0.8)
 */
export function canvasToDataURL(
  canvas: HTMLCanvasElement,
  type?: string,
  quality?: number,
) {
  return canvas.toDataURL(type, quality)
}
