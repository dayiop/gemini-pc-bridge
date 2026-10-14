@echo off
chcp 65001 > nul
title Gemini PC Bridge
echo.
echo ========================================================
echo   Запуск Gemini PC Bridge (Проверка окружения)
echo ========================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ОШИБКА] Node.js не найден!
    echo Пожалуйста, установите Node.js с официального сайта: https://nodejs.org/
    pause
    exit /b 1
)

node src\check-env.js
echo.
node src\launcher.js
pause
