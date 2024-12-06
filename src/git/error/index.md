# 遇到的错误

## SSL certificate problem: unable to get local issuer certificate

在使用git clone时，出现如下错误：

```
Cloning into 'xxx'...
fatal: unable to access 'https://github.com/xxx/xxx.git/': SSL certificate problem: unable to get local issuer certificate
```

如果你设置了证书，那可能是你开了代理、加速器之类的，导致git无法验证证书，可以关闭代理、加速器试试。