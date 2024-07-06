# 适用场景

Node.js 的 `child_process` 模块提供了四个主要方法来创建子进程：`spawn`、`exec`、`execFile` 和 `fork`。每个方法都有不同的特点和适用场景。以下是它们的详细比较：

1. **spawn**

   - **功能**：使用指定的命令行参数创建一个新进程。
   - **适用场景**：当需要持续与子进程交互（通过流），并且子进程可能产生大量输出时。
   - **特点**：
     - 返回一个 `ChildProcess` 对象，可以通过该对象的 `stdout` 和 `stderr` 流与子进程通信。
     - 不缓冲输出，适合处理大量数据的场景。
     - 直接执行可执行文件，不经过 shell。

   ```javascript
   const { spawn } = require('child_process');
   const ls = spawn('ls', ['-lh', '/usr']);

   ls.stdout.on('data', (data) => {
     console.log(`stdout: ${data}`);
   });

   ls.stderr.on('data', (data) => {
     console.error(`stderr: ${data}`);
   });

   ls.on('close', (code) => {
     console.log(`child process exited with code ${code}`);
   });
   ```

2. **exec**

   - **功能**：使用 shell 来执行命令并缓存输出。
   - **适用场景**：当需要运行一个命令，并且只关心最终的输出结果（而不是持续交互）时。
   - **特点**：
     - 返回一个 `ChildProcess` 对象，通过回调函数接收完整的输出（包括 `stdout` 和 `stderr`）。
     - 输出是缓冲的，适合处理小量数据。
     - 由于使用 shell，支持 shell 特性和符号（例如重定向、管道等）。

   ```javascript
   const { exec } = require('child_process');
   exec('ls -lh /usr', (error, stdout, stderr) => {
     if (error) {
       console.error(`exec error: ${error}`);
       return;
     }
     console.log(`stdout: ${stdout}`);
     console.error(`stderr: ${stderr}`);
   });
   ```

3. **execFile**

   - **功能**：直接执行可执行文件，不经过 shell。
   - **适用场景**：当只需运行一个可执行文件，并传递参数，而不需要 shell 特性时。
   - **特点**：
     - 返回一个 `ChildProcess` 对象，通过回调函数接收完整的输出（包括 `stdout` 和 `stderr`）。
     - 输出是缓冲的，适合处理小量数据。
     - 更加安全，因为不涉及 shell（避免了 shell 注入攻击）。

   ```javascript
   const { execFile } = require('child_process');
   execFile('/path/to/executable', ['arg1', 'arg2'], (error, stdout, stderr) => {
     if (error) {
       console.error(`execFile error: ${error}`);
       return;
     }
     console.log(`stdout: ${stdout}`);
     console.error(`stderr: ${stderr}`);
   });
   ```

4. **fork**

   - **功能**：生成一个新的 Node.js 进程，并且可以与父进程通信。
   - **适用场景**：当需要在子进程中运行 Node.js 脚本，并且需要与父进程进行大量的消息传递时。
   - **特点**：
     - 专门用于创建 Node.js 子进程，可以在父子进程间发送消息（使用 IPC 通道）。
     - 返回一个 `ChildProcess` 对象，可以使用 `send` 方法发送消息，使用 `on('message')` 监听消息。

   ```javascript
   const { fork } = require('child_process');
   const child = fork('child.js');

   child.on('message', (msg) => {
     console.log('Message from child', msg);
   });

   child.send({ hello: 'world' });
   ```

总结：

- `spawn` 适用于需要与子进程进行流式通信的情况。
- `exec` 适用于一次性运行命令并获取其输出结果的情况。
- `execFile` 适用于运行可执行文件并获取其输出结果的情况。
- `fork` 适用于需要创建 Node.js 子进程并进行 IPC 通信的情况。

chatgpt 总结
