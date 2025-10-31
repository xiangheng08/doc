/**
 * Image 转 Canvas
 */
export function imageToCanvas(image: HTMLImageElement) {
  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Canvas 2D API is not supported in current browser')
  }
  ctx.drawImage(image, 0, 0)
  return canvas
}
