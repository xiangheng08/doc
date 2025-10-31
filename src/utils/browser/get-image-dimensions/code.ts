import { loadImage } from '../../browser/load-image/code'

export interface ImageDimensions {
  width: number
  height: number
}

/**
 * 获取图片的宽高
 */
export async function getImageDimensions(
  src: string,
): Promise<ImageDimensions> {
  const img = await loadImage(src)
  return { width: img.naturalWidth, height: img.naturalHeight }
}

/**
 * 获取图片的宽高（通过 File 对象）
 */
export async function getImageDimensionsByFile(
  file: File,
): Promise<ImageDimensions> {
  const img = await loadImage(URL.createObjectURL(file), { revoke: true })
  return { width: img.naturalWidth, height: img.naturalHeight }
}
