import crypto from 'node:crypto'

/**
 * 生成 EC 密钥对
 */
export function generateEcKeyPair() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
    namedCurve: 'secp256k1',
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  })

  return { privateKey, publicKey }
}

/**
 * 对数据签名（ES）
 * @param data 数据
 * @param privateKey 私钥
 */
export function signWithEC(data: string | Buffer, privateKey: string) {
  const sign = crypto.createSign('SHA256')
  sign.update(data)
  return sign.sign(privateKey, 'base64')
}

/**
 * 验证签名（ES）
 * @param data 数据
 * @param sign 签名
 * @param publicKey 公钥
 */
export function verifySignWithEC(
  data: string | Buffer,
  sign: string,
  publicKey: string,
) {
  const verify = crypto.createVerify('SHA256')
  verify.update(data)
  return verify.verify(publicKey, sign, 'base64')
}

/**
 * 生成 RSA 密钥对（承载数据 245 byte）
 */
export function generateRSAKeyPair() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  })

  return { privateKey, publicKey }
}

/**
 * 使用 RSA 算法加密
 * @param data 数据
 * @param publicKey 公钥
 */
export function encryptWithRSA(data: Buffer, publicKey: string) {
  return crypto.publicEncrypt(publicKey, data)
}

/**
 * 使用 RSA 算法解密
 * @param data 加密的数据
 * @param privateKey 私钥
 */
export function decryptWithRSA(encryptedData: Buffer, privateKey: string) {
  return crypto.privateDecrypt(privateKey, encryptedData)
}

/**
 * 使用 AES-GCM 算法加密
 * @param data 数据
 * @param encryptionKey 密钥（hex 32 byte）
 */
export function encryptWithAESGCM(data: Buffer, encryptionKey: string) {
  const iv = crypto.randomBytes(12) // 生成随机的Initialization Vector (IV)，通常是12字节
  const cipher = crypto.createCipheriv(
    'aes-256-gcm',
    Buffer.from(encryptionKey, 'hex'),
    iv,
  )

  const encryptedBuffers = [iv]
  encryptedBuffers.push(cipher.update(data))
  encryptedBuffers.push(cipher.final())

  // 获取加密后的数据
  const encryptedData = Buffer.concat(encryptedBuffers)

  // 获取认证标签 (authentication tag)
  const tag = cipher.getAuthTag()

  return {
    tag: tag.toString('hex'),
    encryptedData,
  }
}

/**
 * 使用 AES-GCM 算法解密
 * @param encryptedData 加密的数据
 * @param encryptionKey 密钥（hex 32 byte）
 * @param iv 初始向量
 * @param tag 认证标签
 */
export function decryptWithAESGCM(
  encryptedData: Buffer,
  encryptionKey: string,
  tag: string,
) {
  const iv = encryptedData.subarray(0, 12)
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(encryptionKey, 'hex'),
    iv,
  )
  decipher.setAuthTag(Buffer.from(tag, 'hex'))

  const decryptedBuffers = []
  decryptedBuffers.push(decipher.update(encryptedData.subarray(12)))
  decryptedBuffers.push(decipher.final())

  // 获取解密后的数据
  const decryptedData = Buffer.concat(decryptedBuffers)

  return decryptedData
}
