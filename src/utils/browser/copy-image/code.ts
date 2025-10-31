import { loadImage } from '../load-image/code'
import { imageToCanvas } from '../image-to-canvas/code'
import { canvasToBlob } from '../canvas-to-blob/code'
import { copyFileToClipboard } from '../copy-file/code'

/**
 * 复制图片到剪贴板
 * @example
 * copyImageToClipboard('https://example.com/image.png')
 * copyImageToClipboard(image)
 */
export function copyImageToClipboard(url: string): Promise<void>
export function copyImageToClipboard(
  image: HTMLImageElement,
): Promise<void>
export async function copyImageToClipboard(
  urlOrImage: string | HTMLImageElement,
) {
  if (!navigator.clipboard) {
    throw new Error('Clipboard API is not supported in current browser')
  }

  const image =
    typeof urlOrImage === 'string'
      ? await loadImage(urlOrImage, { crossOrigin: 'anonymous' })
      : urlOrImage

  const canvas = imageToCanvas(image)
  const blob = await canvasToBlob(canvas)
  await copyFileToClipboard(blob)
}
