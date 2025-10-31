import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

/**
 * Hash 算法
 */
type HashAlgorithm =
  | 'md5'
  | 'sha1'
  | 'sha224'
  | 'sha256'
  | 'sha384'
  | 'sha512'
  | 'sha3-224'
  | 'sha3-256'
  | 'sha3-384'
  | 'sha3-512'
  | 'shake128'
  | 'shake256'

/**
 * 获取文件hash
 */
function getFileHash(
  filePath: string,
  algorithm: HashAlgorithm = 'md5',
  options?: crypto.HashOptions,
) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      reject(new Error('File not found'))
      return
    }
    const hash = crypto.createHash(algorithm, options)
    const stream = fs.createReadStream(filePath)

    stream.on('data', (data) => {
      hash.update(data)
    })

    stream.on('end', () => {
      const fileHash = hash.digest('hex')
      resolve(fileHash)
    })

    stream.on('error', (error) => {
      reject(error)
    })
  })
}

// 示例用法
const filePath = path.join(__dirname, './65b7429575882.jpg')
const algorithm = 'md5' // 可以是 'md5', 'sha256', 等等

getFileHash(filePath, algorithm)
  .then((hash) => {
    console.log(`${algorithm.toUpperCase()} Hash:`, hash)
  })
  .catch((error) => {
    console.error('Error calculating hash:', error)
  })
