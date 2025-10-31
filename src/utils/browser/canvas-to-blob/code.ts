/**
 * Canvas 转 Blob
 * @param canvas 需要转换的 HTMLCanvasElement 元素
 * @param type MIME 类型（如 'image/png', 'image/jpeg' 等）
 * @param quality 图像质量，取值范围 0-1
 * @example
 * const blob = await canvasToBlob(canvas, 'image/png', 0.8)
 */
export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type?: string,
  quality?: number,
): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('canvas to blob error'))
        }
      },
      type,
      quality,
    )
  })
}
