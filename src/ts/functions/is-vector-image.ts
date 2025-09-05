export const isVectorImage = (file: File): boolean => {
  return file.type.startsWith('image/svg')
}
