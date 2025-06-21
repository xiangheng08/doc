# 常用方法

## 判断端口是否被占用

promise 风格

```js
const net = require('net');

/**
 * 检测指定端口是否被占用
 * @param port 要检测的端口
 * @returns 返回一个 Promise 对象，解析为布尔值，表示端口是否被占用
 */
function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // 端口被占用
        resolve(true);
      } else {
        // 其他错误
        resolve(err);
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
  if (res instanceof Error) {
    // 出现其他错误
    console.log(res.message);
  } else if (res) {
    console.log('端口被占用');
  } else {
    console.log('端口未被占用');
  }
});
```

回调风格

```js
const net = require('net');

/**
 * 检测指定端口是否被占用
 * @param port 要检测的端口
 * @param callback 回调函数，接收一个布尔值参数，表示端口是否被占用
 */
function checkPort(port, callback) {
  const server = net.createServer();

  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      // 端口被占用
      callback(true);
    } else {
      // 其他错误
      callback(err);
    }
    server.close();
  });

  server.once('listening', () => {
    // 端口未被占用
    server.close();
    callback(false);
  });

  server.listen(port, 'localhost');
}

// 使用示例
checkPort(8080, (res) => {
  if (res instanceof Error) {
    // 出现其他错误
    console.log(res.message);
  } else if (res) {
    console.log('端口被占用');
  } else {
    console.log('端口未被占用');
  }
});
```

## 删除指定目录下所有文件

```js
const fs = require('fs');
const path = require('path');

/**
 * 删除指定目录下所有文件
 * @param {string} folderPath 目录路径
 * @param {boolean} deleteSelf 是否删除目录自身
 */
function deleteFolderRecursive(folderPath, deleteSelf = false) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);

      if (fs.lstatSync(curPath).isDirectory()) {
        // 递归删除子文件夹
        deleteFolderRecursive(curPath, true);
      } else {
        // 删除文件
        fs.unlinkSync(curPath);
      }
    });
    // 是否删除目录本身
    if (deleteSelf) {
      fs.rmdirSync(folderPath);
    }
  }
}
```

## 判断路径是否为另一个路径的子路径

```js
const path = require('path');

/**
 * 判断路径是否为另一个路径的子路径
 * @param {string} parentPath 父路径
 * @param {string} childPath 子路径
 * @param {boolean} notSame 相同的路径时否返回 false
 */
function isSubPath(parentPath, childPath, notSame = true) {
  const relativePath = path.relative(parentPath, childPath);
  if (notSame && relativePath === '') return false;
  return !relativePath.startsWith('..') && !path.isAbsolute(relativePath);
}

// 示例用法
const parentPath = '/path/to/another/parent';
const childPath1 = '/path/to/another/parent/child';
const childPath2 = '/path/to/another/test';

console.log(isSubPath(parentPath, childPath1)); // true
console.log(isSubPath(parentPath, childPath2)); // false
// 相同路径
console.log(isSubPath(parentPath, parentPath)); // false
console.log(isSubPath(parentPath, parentPath, false)); // true
```

## 判断两个路径是否指向同一位置

```js
const path = require('path');

/**
 * 判断两个路径是否指向同一位置
 * @param {string} path1 路径1
 * @param {string} path2 路径2
 * @param {boolean} p 是否在路径格式（相对路径、绝对路径）不一致返回 false
 * @param {string} root 根路径
 */
function arePathsEqual(path1, path2, p = true, root) {
  // 格式不一致时返回 false
  if (p && path.isAbsolute(path1) !== path.isAbsolute(path2)) {
    return false;
  }

  const paths1 = [path1];
  const paths2 = [path2];

  if (root && !path.isAbsolute(path1)) {
    paths1.unshift(root);
  }
  if (root && !path.isAbsolute(path2)) {
    paths2.unshift(root);
  }

  const p1 = path.resolve(...paths1);
  const p2 = path.resolve(...paths2);

  return p1 === p2;
}
```

## 格式化字节

```js
const formatBytes = (bytes, decimals = 2) => {
  if(bytes <= 0) return '0B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + units[i] + 'B'
}
```


## 格式化文件大小

```js
/**
 * 格式化文件大小
 * @param size file bytes
 */
function formatFileSize(size) {
  const map = ['', 'K', 'M', 'G', 'T'];

  let i = 0;
  while (size > 1024) {
    size = size / 1024;
    i++;
  }

  return `${size.toFixed(2).replace(/\.?0+$/, '')}${map[i]}B`;
}
```

## 随机 buffer 数据

```js
const crypto = require('crypto');

/**
 * 随机 buffer 数据
 * @param size 大小
 */
function randomBuffer(size: number) {
  return crypto.randomBytes(size);
}
```

## 解析路径

```js
const path = require('path');

/**
 * 解析路径
 * @param root 根路径
 * @param _path 路径
 */
function resolvePath(root: string, _path: string) {
  if (path.isAbsolute(_path)) {
    return _path;
  } else {
    return path.join(root, _path);
  }
}
```

## 加密相关

```js
const crypto = require('crypto');

/**
 * 生成 EC 密钥对
 */
function generateEcKeyPair() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
    namedCurve: 'secp256k1',
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });

  return { privateKey, publicKey };
}

/**
 * 对数据签名（ES）
 * @param data 数据
 * @param privateKey 私钥
 */
function signWithEC(data: string | Buffer, privateKey: string) {
  const sign = crypto.createSign('SHA256');
  sign.update(data);
  return sign.sign(privateKey, 'base64');
}

/**
 * 验证签名（ES）
 * @param data 数据
 * @param sign 签名
 * @param publicKey 公钥
 */
function verifySignWithEC(data: string | Buffer, sign: string, publicKey: string) {
  const verify = crypto.createVerify('SHA256');
  verify.update(data);
  return verify.verify(publicKey, sign, 'base64');
}

/**
 * 生成 RSA 密钥对（承载数据 245 byte）
 */
function generateRSAKeyPair() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });

  return { privateKey, publicKey };
}

/**
 * 使用 RSA 算法加密
 * @param data 数据
 * @param publicKey 公钥
 */
function encryptWithRSA(data: Buffer, publicKey: string) {
  return crypto.publicEncrypt(publicKey, data);
}

/**
 * 使用 RSA 算法解密
 * @param data 加密的数据
 * @param privateKey 私钥
 */
function decryptWithRSA(encryptedData: Buffer, privateKey: string) {
  return crypto.privateDecrypt(privateKey, encryptedData);
}

/**
 * 使用 AES-GCM 算法加密
 * @param data 数据
 * @param encryptionKey 密钥（hex 32 byte）
 */
function encryptWithAESGCM(data: Buffer, encryptionKey: string) {
  const iv = crypto.randomBytes(12); // 生成随机的Initialization Vector (IV)，通常是12字节
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(encryptionKey, 'hex'), iv);

  const encryptedBuffers = [iv];
  encryptedBuffers.push(cipher.update(data));
  encryptedBuffers.push(cipher.final());

  // 获取加密后的数据
  const encryptedData = Buffer.concat(encryptedBuffers);

  // 获取认证标签 (authentication tag)
  const tag = cipher.getAuthTag();

  return {
    tag: tag.toString('hex'),
    encryptedData,
  };
}

/**
 * 使用 AES-GCM 算法解密
 * @param encryptedData 加密的数据
 * @param encryptionKey 密钥（hex 32 byte）
 * @param iv 初始向量
 * @param tag 认证标签
 */
function decryptWithAESGCM(encryptedData: Buffer, encryptionKey: string, tag: string) {
  const iv = encryptedData.subarray(0, 12);
  const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(encryptionKey, 'hex'), iv);
  decipher.setAuthTag(Buffer.from(tag, 'hex'));

  const decryptedBuffers = [];
  decryptedBuffers.push(decipher.update(encryptedData.subarray(12)));
  decryptedBuffers.push(decipher.final());

  // 获取解密后的数据
  const decryptedData = Buffer.concat(decryptedBuffers);

  return decryptedData;
}
```

## 数字转 buffer

```js
/**
 * 数字转 buffer
 * @param num 数
 * @param len buffer 长度
 */
function numberToBuffer(num: number, len: number) {
  const buf = Buffer.alloc(len);
  for (let i = 0; i < len; i++) {
    buf[i] = num & 0xff;
    num = num >> 8;
  }
  return buf;
}

/**
 * buffer 转数字
 * @param buf buffer 数据
 * @param len 读取的 buffer 长度
 */
function bufferToNumber(buf: Buffer, len: number) {
  return buf.readIntLE(0, len);
}
```

## 创建目录

```js
/**
 * 创建目录（如果不存在）
 * @param {string} dirPath
 */
function mkdirIfNotExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
}
```

## 获取文件 hash

```js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * 获取文件hash
 * @param {string} filePath
 * @param {'md5' | 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512' | 'sha3-224' | 'sha3-256' | 'sha3-384' | 'sha3-512' | 'shake128' | 'shake256'} [algorithm] default: md5
 * @param {crypto.HashOptions} [options]
 * @returns {Promise<string>}
 */
function getFileHash(filePath, algorithm = 'md5', options) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      reject(new Error('File not found'));
      return;
    }
    const hash = crypto.createHash(algorithm, options);
    const stream = fs.createReadStream(filePath);

    stream.on('data', (data) => {
      hash.update(data);
    });

    stream.on('end', () => {
      const fileHash = hash.digest('hex');
      resolve(fileHash);
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
}

// 示例用法
const filePath = path.join(__dirname, './65b7429575882.jpg');
const algorithm = 'md5'; // 可以是 'md5', 'sha256', 等等

getFileHash(filePath, algorithm)
  .then((hash) => {
    console.log(`${algorithm.toUpperCase()} Hash:`, hash);
  })
  .catch((error) => {
    console.error('Error calculating hash:', error);
  });
```

## 路径排序

```js
const path = require('path');

/**
 * 路径排序
 * @param {string[]} paths
 * @param {'asc' | 'desc'} order default: desc
 * @returns {string[]}
 */
function sortPaths(paths, order = 'desc') {
  return paths.sort((a, b) => {
    const aParts = path.normalize(a).split(path.sep);
    const bParts = path.normalize(b).split(path.sep);

    for (let i = 0; i < Math.min(aParts.length, bParts.length); i++) {
      if (aParts[i] !== bParts[i]) {
        return aParts[i] < bParts[i] ? -1 : 1;
      }
    }

    if (order === 'asc') {
      return aParts.length - bParts.length;
    } else {
      return bParts.length - aParts.length;
    }
  });
}
```

::: details 使用示例

<!-- prettier-ignore -->
```js
const paths = [
  "C:\\Windows\\System32",
  "a/b",
  "a/b/c",
  "r/e",
  "a",
  "r",
  "C:\\Windows"
];

// 适合删除文件
console.log(sortPaths(paths));
/* 
[
  'C:\\Windows\\System32',
  'C:\\Windows',
  'a/b/c',
  'a/b',
  'a',
  'r/e',
  'r'
]
*/

// 适合创建文件
console.log(sortPaths(paths, "asc"));
/* 
[
  'C:\\Windows',
  'C:\\Windows\\System32',
  'a',
  'a/b',
  'a/b/c',
  'r',
  'r/e'
]
*/
```

:::
