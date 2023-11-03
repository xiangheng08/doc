# My Doc

## 将打包后将文件复制到指定目录

在项目根目录下新建名为 copylocation 的文件

内容如下：

```
path = D:\WWW\doc
noExistsCreate = true
```
- path：复制到的目录，复制前目录内若有文件自动清空
- noExistsCreate：如果目录不存在，是否创建（不会递归创建，所以需要检查 path 的上一级目录必须存在）
