import { loadImage } from './load-image'

export const getImageAverageColor = async (file: File) => {
  const url = URL.createObjectURL(file)
  const image = await loadImage(url)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('CanvasRenderingContext2D is null')
  }
  canvas.width = image.width
  canvas.height = image.height
  ctx.drawImage(image, 0, 0)
  const colors = ctx.getImageData(0, 0, image.width, image.height).data

  let r = 0
  let g = 0
  let b = 0

  for (let i = 0; i < colors.length; i += 4) {
    r += colors[i]
    g += colors[i + 1]
    b += colors[i + 2]
  }

  r /= image.width * image.height
  g /= image.width * image.height
  b /= image.width * image.height

  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) }
}
