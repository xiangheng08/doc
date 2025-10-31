import crypto from 'node:crypto'

/**
 * 随机 buffer 数据
 * @param size 大小
 */
export function randomBuffer(size: number) {
  return crypto.randomBytes(size)
}
