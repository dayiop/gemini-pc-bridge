import { execSync } from 'child_process';
import os from 'os';
import fs from 'fs';
import path from 'path';

function checkCommand(cmd, label) {
  try {
    const version = execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'], encoding: 'utf-8' }).trim();
    return { ok: true, version: version.split('\n')[0] };
  } catch {
    return { ok: false, version: null };
  }
}

console.log('\n========================================================');
console.log('   Gemini PC Bridge | Проверка системного окружения   ');
console.log('========================================================\n');

const checks = [];

// 1. OS Check
const platform = os.platform();
checks.push({
  name: `Операционная система: ${platform} (${os.release()})`,
  ok: true,
  detail: platform === 'win32' ? 'Windows поддерживается полностью (windows-mcp доступен)' : 'Не-Windows система (windows-mcp заменяется на базовый терминал)'
});

// 2. Node.js
const nodeCheck = checkCommand('node -v', 'Node.js');
checks.push({
  name: 'Node.js runtime',
  ok: nodeCheck.ok,
  detail: nodeCheck.ok ? `${nodeCheck.version} (OK)` : 'Не найден! Установите с https://nodejs.org/'
});

// 3. npx
const npxCheck = checkCommand(process.platform === 'win32' ? 'cmd /c "npx -v"' : 'npx -v', 'npx');
checks.push({
  name: 'NPX package runner',
  ok: npxCheck.ok,
  detail: npxCheck.ok ? `v${npxCheck.version} (OK)` : 'Не найден в PATH'
});

// 4. uv / uvx (для python MCP серверов)
const uvCheck = checkCommand(process.platform === 'win32' ? 'cmd /c "uvx --version"' : 'uvx --version', 'uvx');
checks.push({
  name: 'UV / UVX (Python Fast Runner)',
  ok: uvCheck.ok,
  detail: uvCheck.ok ? `${uvCheck.version} (OK)` : 'Не найден! Рекомендуется установить (winget install astral-sh.uv) для Windows MCP'
});

// 5. Config file presence
const configPath = path.resolve(process.cwd(), 'config', 'mcp_config.json');
const configExists = fs.existsSync(configPath);
checks.push({
  name: 'Файл конфигурации (config/mcp_config.json)',
  ok: configExists,
  detail: configExists ? 'Найден и готов к использованию' : 'Отсутствует! Создайте по образцу mcp_config.example.json'
});

// Output results
checks.forEach(item => {
  const icon = item.ok ? '✓' : '✗';
  const status = item.ok ? '\x1b[32m[ГОТОВО]\x1b[0m' : '\x1b[31m[ВНИМАНИЕ]\x1b[0m';
  console.log(`${icon} ${item.name}`);
  console.log(`   └─ ${status} ${item.detail}\n`);
});

const allCriticalOk = nodeCheck.ok && npxCheck.ok && configExists;
if (allCriticalOk) {
  console.log('\x1b[32m✔ Базовые компоненты в порядке! Вы можете запускать Gemini PC Bridge.\x1b[0m\n');
} else {
  console.log('\x1b[33m⚠ Обнаружены предупреждения. Ознакомьтесь с инструкцией в README.md для устранения.\x1b[0m\n');
}
