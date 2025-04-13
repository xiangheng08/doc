# 常用字段设计

| 名称       | 类型        | 长度   | 说明                       | 注意事项                                 |
| ---------- | ----------- | ------ | -------------------------- | ---------------------------------------- |
| id         | `BIGINT`    | -      | 主键自增唯一标识           | 避免业务耦合，仅用于逻辑关联             |
| username   | `VARCHAR`   | 30-50  | 用户名                     | 需添加唯一索引，考虑大小写敏感问题       |
| password   | `VARCHAR`   | 64-128 | 加密后的密码               | 必须使用哈希算法（如bcrypt/SHA-256）     |
| email      | `VARCHAR`   | 100    | 用户邮箱                   | 需格式校验，可添加唯一索引               |
| mobile     | `VARCHAR`   | 20     | 手机号                     | 考虑国际号码格式（如+86前缀）            |
| created_at | `DATETIME`  | -      | 记录创建时间               | 建议默认值设为当前时间                   |
| updated_at | `TIMESTAMP` | -      | 记录最后更新时间           | 可配置自动更新（ON UPDATE CURRENT_TIME） |
| status     | `TINYINT`   | 1      | 状态标志（0禁用/1启用）    | 可扩展预留状态码（如2=待审核）           |
| is_deleted | `TINYINT`   | 1      | 逻辑删除标志（0/1）        | 默认0，查询时需过滤已删除数据            |
| order_num  | `INT`       | -      | 排序序号                   | 需配合索引优化排序查询性能               |
| ip_address | `VARCHAR`   | 45     | IP地址                     | 需兼容IPv4/IPv6，存储前可做标准化处理    |
| amount     | `DECIMAL`   | 10,2   | 金额/价格字段              | 避免使用FLOAT，防止精度丢失              |
| url        | `VARCHAR`   | 255    | 网页链接                   | 可考虑用TEXT类型应对超长URL              |
| gender     | `TINYINT`   | 1      | 性别（0未知/1男/2女）      | 可改用ENUM类型增强可读性                 |
| avatar     | `VARCHAR`   | 255    | 头像文件路径               | 建议存储相对路径而非绝对路径             |
| remark     | `TEXT`      | -      | 备注信息                   | 避免过度使用，影响查询性能               |
| ext_data   | `JSON`      | -      | 扩展JSON数据               | 避免嵌套过深，需注意JSON字段查询效率     |
| category   | `VARCHAR`   | 20     | 分类标识（如product/user） | 可配合枚举约束或字典表管理               |
| file_path  | `VARCHAR`   | 255    | 文件存储路径               | 建议拆分目录层级提升存储性能             |
| salt       | `VARCHAR`   | 64     | 密码加密盐                 | 需保证随机性，与密码分开存储             |

<style scoped>
  table tr td:nth-child(3) {
    white-space: nowrap;
  }
</style>
