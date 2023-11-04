const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs')

// 输出目录
const distPath = path.join(__dirname, '../docs/.vitepress/dist');
// 移动文件名称
const moveName = 'copylocation';
// 读取路径
const readPath = path.join(process.cwd(), moveName);
// 解析
function parse(str = '') {
	const res = {
		path: null,
		noExistsCreate: false,
	};

	str.split(/[\n\r]/).forEach((item) => {
		if (!item) return;
    const arr = item.split(/[=]/);
		if (arr.length === 2) {
			const key = arr[0].trim();
			const val = arr[1].trim();
			if (key === 'path') {
				res.path = val;
			} else if (key === 'noExistsCreate') {
				res.noExistsCreate = val === 'true';
			}
		}
	});

	return res;
}
// 复制文件
function copyDirectoryContents(sourceDir, targetDir, mkdir = true) {
	// 创建目标目录
	if (mkdir && !fs.existsSync(targetDir)) {
		fs.mkdirSync(targetDir);
	}

	// 读取源目录的内容
	const files = fs.readdirSync(sourceDir);

	files.forEach((file) => {
		const sourceFilePath = path.join(sourceDir, file);
		const targetFilePath = path.join(targetDir, file);

		// 检查文件状态
		const stats = fs.statSync(sourceFilePath);

		if (stats.isDirectory()) {
			// 如果是子目录，递归调用函数
			copyDirectoryContents(sourceFilePath, targetFilePath);
		} else if (stats.isFile()) {
			// 如果是文件，复制到目标目录
			fs.copyFileSync(sourceFilePath, targetFilePath);
		}
	});
}
// 清空目录下所有文件
function emptyDirectory(directoryPath) {
  if (fs.existsSync(directoryPath)) {
      // 读取目录中的文件和子目录
      fs.readdirSync(directoryPath).forEach((file) => {
          const filePath = path.join(directoryPath, file);

          // 检查文件状态
          const stats = fs.statSync(filePath);

          if (stats.isDirectory()) {
              // 如果是子目录，递归调用函数
              emptyDirectory(filePath);
              fs.rmdirSync(filePath);
          } else if (stats.isFile()) {
              // 如果是文件，删除文件
              fs.unlinkSync(filePath);
          }
      });
  }
}

if (fs.existsSync(readPath)) {
	const data = fs.readFileSync(readPath, 'utf-8');
	const res = parse(data);

	if (res.path) {
		console.log(`解析到：${moveName}，准备复制，目标路径：${res.path}`);

    if (fs.existsSync(res.path)) {
      if (fs.readdirSync(res.path).length > 0) {
        console.log(`目标路径存在文件，准备清空`);
        emptyDirectory(res.path)
        console.log(`清空完成`);
      }
    } else {
      if (res.noExistsCreate) {
        fs.mkdirSync(res.path);
      } else {
        console.log(`目标路径不存在，请检查配置文件`);
        return;
      }
    }

		copyDirectoryContents(distPath, res.path, false);

		console.log(`复制完成 ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`);
	}
}
