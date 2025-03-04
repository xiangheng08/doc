@echo off
setlocal enabledelayedexpansion

:: ============== 用户配置区域 ==============
set "COMMAND=npm start"
:: 示例配置：
:: set "COMMAND=D:\project\app.exe --port=8080"
:: set "COMMAND=python main.py"
:: ==========================================

:: 转义双引号（命令中含空格必须包裹引号）
set "CMD_STR=cmd /c %COMMAND%"
set "CMD_STR=!CMD_STR:"=""!"

:: 生成临时VBS脚本
echo Set WshShell = CreateObject("WScript.Shell") > "%TEMP%\launch.vbs"
echo WshShell.Run "%CMD_STR%", 0, False >> "%TEMP%\launch.vbs"

:: 执行并清理
start "" "%TEMP%\launch.vbs"
timeout /t 1 >nul
del "%TEMP%\launch.vbs" >nul 2>&1

echo 后台进程已启动，PID可通过任务管理器查看
