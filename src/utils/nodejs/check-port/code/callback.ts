import net from 'node:net'

/**
 * 检测指定端口是否被占用
 * @param port 要检测的端口
 * @param callback 回调函数，接收一个布尔值参数，表示端口是否被占用
 */
export function checkPort(
  port: number,
  callback: (err: Error | null, isOccupied: boolean) => void,
) {
  const server = net.createServer()

  server.once('error', (err) => {
    if ((err as any).code === 'EADDRINUSE') {
      // 端口被占用
      callback(null, true)
    } else {
      // 其他错误
      callback(err, false)
    }
    server.close()
  })

  server.once('listening', () => {
    // 端口未被占用
    server.close()
    callback(null, false)
  })

  server.listen(port, 'localhost')
}

// 使用示例
checkPort(8080, (err, isOccupied) => {
  if (err) {
    // 出现其他错误
    console.log(err)
  } else {
    if (isOccupied) {
      console.log('端口被占用')
    } else {
      console.log('端口未被占用')
    }
  }
})
