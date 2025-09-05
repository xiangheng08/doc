import { loadImage } from './load-image'

export interface ImageDimensions {
  width: number
  height: number
}

export const getImageDimensions = async (
  src: string,
): Promise<ImageDimensions> => {
  const img = await loadImage(src)
  return { width: img.naturalWidth, height: img.naturalHeight }
}

export const getImageDimensionsByFile = async (
  file: File,
): Promise<ImageDimensions> => {
  const img = await loadImage(URL.createObjectURL(file), true)
  return { width: img.naturalWidth, height: img.naturalHeight }
}
