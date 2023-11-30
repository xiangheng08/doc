# 使用方法

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