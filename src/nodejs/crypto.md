# crypto 加密

## 加密算法

### 对称加密 (AES示例)
```js
const crypto = require('crypto');

// 使用 AES-256-CBC + 随机IV
function encrypt(text, key, iv) {
  const cipher = crypto.createCipheriv('aes-256-cbc', 
    Buffer.from(key), 
    iv
  );
  return Buffer.concat([cipher.update(text), cipher.final()]);
}

function decrypt(encrypted, key, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', 
    Buffer.from(key), 
    iv
  );
  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
}

// 使用示例
const key = crypto.randomBytes(32); // 256位密钥
const iv = crypto.randomBytes(16);  // 16字节IV
const encrypted = encrypt('secret', key, iv);
const decrypted = decrypt(encrypted, key, iv);
```

常见问题：
- IV需要随机且每次加密不同
- 密钥需要安全存储（不要硬编码）
- CBC模式需要填充处理

## 哈希计算

### 基础哈希
```js
// ✅ 使用 SHA-256
const hash = crypto.createHash('sha256');
hash.update('data1');
hash.update('data2');
console.log(hash.digest('hex')); // 十六进制结果

// 快捷方法
crypto.createHash('sha256').update('data').digest('base64');
```

⚠️ 注意：
- 不要使用已破解算法（md5/sha1）
- 大文件使用流式处理
- 加盐防止彩虹表攻击

## HMAC

```js
// ✅ 带密钥的哈希验证
const hmac = crypto.createHmac('sha256', 'secret-key');
hmac.update('data');
console.log(hmac.digest('hex'));

// 最佳实践：使用随机密钥+高强度算法
const hmacKey = crypto.randomBytes(32);
```

## 密钥对生成

### RSA 非对称加密
```js
// ✅ 生成2048位RSA密钥对
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

// 异步版本推荐用于生产环境
crypto.generateKeyPair('rsa', {/* 配置 */}, callback);
```

## 签名与验证

```js
// 签名
const sign = crypto.createSign('sha256');
sign.update('data');
const signature = sign.sign(privateKey, 'hex');

// 验证
const verify = crypto.createVerify('sha256');
verify.update('data');
console.log(verify.verify(publicKey, signature, 'hex'));
```

✅ 最佳实践：
- 使用 RSA-SHA256 或 ECDSA
- 签名数据包含时间戳防重放

## 随机数生成

```js
// ✅ 安全随机数
const buf = crypto.randomBytes(32); // 32字节随机数
const randomInt = crypto.randomInt(0, 100); // 0-99随机整数

// ❌ 避免使用 Math.random()
```

## 常见问题

### 1. IV重复使用
⚠️ 症状：相同明文生成相同密文  
✅ 解决：每次加密生成新IV（存储IV与密文一起）

### 2. 密钥存储不安全
⚠️ 症状：密钥硬编码在代码中  
✅ 解决：使用环境变量/KMS服务

### 3. 算法选择错误
⚠️ 症状：`Error: Invalid algorithm`  
✅ 检查支持的算法列表：
```js
console.log(crypto.getCiphers());
console.log(crypto.getHashes());
```

### 4. 编码不一致
⚠️ 症状：解密/验证时出现乱码  
✅ 统一使用 Buffer 或指定编码（hex/base64）

### 5. 性能问题
✅ 解决方案：
- 大文件使用流式处理
- 避免同步API处理大量数据
- 使用更快的算法如 AES-GCM
