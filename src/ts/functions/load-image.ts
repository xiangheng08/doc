export const loadImage = async (url: string, revoke = false) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      if (revoke) {
        URL.revokeObjectURL(img.src)
      }
      resolve(img)
    }
    img.onerror = () => {
      if (revoke) {
        URL.revokeObjectURL(img.src)
      }
      reject(new Error('load image error'))
    }
    img.src = url
  })
}
