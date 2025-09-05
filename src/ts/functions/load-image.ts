export const loadImage = async (url: string, revoke = false) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve(img)
      if (revoke) {
        URL.revokeObjectURL(img.src)
      }
    }
    img.onerror = () => {
      reject(new Error('load image error'))
      if (revoke) {
        URL.revokeObjectURL(img.src)
      }
    }
    img.src = url
  })
}
