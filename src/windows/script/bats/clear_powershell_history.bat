@echo off
chcp 65001

:: 获取用户配置文件路径
set "historyFile=%APPDATA%\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt"

:: 检查文件是否存在
if exist "%historyFile%" (
    echo 正在清除 PowerShell 命令历史记录文件...
    del /f /q "%historyFile%"
    if exist "%historyFile%" (
        echo 删除失败，请检查文件权限。
    ) else (
        echo 历史记录已清除。
    )
) else (
    echo 未找到 PowerShell 命令历史记录文件。
)

pause
