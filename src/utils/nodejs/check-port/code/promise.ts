import net from 'node:net';

/**
 * 检测指定端口是否被占用
 * @param port 要检测的端口
 * @returns 返回一个 Promise 对象，解析为布尔值，表示端口是否被占用
 */
export function checkPort(port: number) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once('error', (err) => {
      if ((err as any).code === 'EADDRINUSE') {
        // 端口被占用
        resolve(true);
      } else {
        // 其他错误
        reject(err);
      }
      server.close();
    });

    server.once('listening', () => {
      // 端口未被占用
      server.close();
      resolve(false);
    });

    server.listen(port, 'localhost');
  });
}

// 使用示例
checkPort(8080).then((res) => {
  if (res) {
    console.log('端口被占用');
  } else {
    console.log('端口未被占用');
  }
});
