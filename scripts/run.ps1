[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "   Gemini PC Bridge | PowerShell Launcher" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ОШИБКА] Node.js не установлен или не найден в PATH!" -ForegroundColor Red
    Write-Host "Скачайте и установите Node.js: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

node (Join-Path $PSScriptRoot "..\src\check-env.js")
node (Join-Path $PSScriptRoot "..\src\launcher.js") $args
