@echo off
chcp 65001 > nul
title Подключение Gemini к ПК через MCP Tunnel
echo.
echo ====================================================================
echo   Запуск публичного MCP-эндпоинта для веб-интерфейса Gemini
echo ====================================================================
echo.
echo Сейчас запустится защищенный туннель и выдаст публичный URL.
echo Скопируйте полученную ссылку (вида https://xxxx.tunnel.gla.ma/mcp)
echo и вставьте в окно Gemini в поле "URL MCP-сервера".
echo.
echo --------------------------------------------------------------------
echo.

npx -y mcp-proxy --tunnel -- uvx windows-mcp serve --transport stdio
pause
