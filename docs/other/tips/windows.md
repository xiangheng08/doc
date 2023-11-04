# windows 小技巧

## 查看端口占用

查看所有运行的端口

```sh
netstat -ano
```

查看被占用端口对应的 PID （通过 findstr 查找对应的端口的进程）

```sh
netstat -aon | findstr "8081"
```

查看指定 PID 的进程

```sh
tasklist | findstr "9088"
```

结束进程，强制（/F参数）杀死 pid 为 9088 的所有进程包括子进程（/T参数）：

```sh
taskkill /T /F /PID 9088 
```