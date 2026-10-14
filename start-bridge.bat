@echo off
chcp 65001 > nul
title Gemini PC Bridge - Local Host
echo.
echo ========================================================
echo   Запуск локального MCP-моста для браузера Gemini
echo ========================================================
echo.

node src\launcher.js --start-host
pause
