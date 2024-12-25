@echo off
chcp 65001

:: 获取用户配置文件路径
set "historyFile=%APPDATA%\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt"

:: 检查文件是否存在
if exist "%historyFile%" (
    echo 正在打开 PowerShell 命令历史记录文件...
    start "" "%historyFile%"
) else (
    echo 未找到 PowerShell 命令历史记录文件。
    pause
)
