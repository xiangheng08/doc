# MySql 错误

## Specified key was too long; max key length is 767 bytes

报错版本 5.6 引擎为 InnoDB

这个错误是说你创建的索引太长了，MySQL 默认的索引长度是 767。

最好的解决办法是升级到 5.7 版本，5.6 版本的 innodb 大长度前缀默认是关闭的，而 5.7 之后大文件前缀默认是开启的，因此就不会发现这个问题。

第一种解决方法：修改索引的 varchar 字符，只要让字符 \* 字节数 < 767 即可。

第二种解决方法：修改索引长度

```sql
-- 查看

show variables like "innodb_large_prefix";

show variables like "innodb_file_format";

-- 修改最大索引长度限制
set global innodb_large_prefix=1;
-- 或
set global innodb_large_prefix=on;

set global innodb_file_format=BARRACUDA;
```

修改插入 sql 的语句添加 `ROW_FORMAT=DYNAMIC`

```sql

create table idx_length_test_02
(
  id int auto_increment primary key,
  name varchar(255)
)ROW_FORMAT=DYNAMIC ENGINE=InnoDB default charset utf8mb4;
```
