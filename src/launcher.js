import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const configPath = path.resolve(process.cwd(), 'config', 'mcp_config.json');

console.log('\n=============================================================');
console.log('   🚀 Gemini PC Bridge | Режим «Антигравити» для Gemini     ');
console.log('=============================================================\n');

if (!fs.existsSync(configPath)) {
  console.error(`❌ Ошибка: файл конфигурации не найден по адресу:\n   ${configPath}\n`);
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const servers = Object.keys(config.mcpServers || {});

console.log(`📦 Загружено MCP-серверов: ${servers.length}`);
servers.forEach((name, i) => {
  const item = config.mcpServers[name];
  console.log(`  ${i + 1}. [${name}] -> ${item.description || item.command}`);
});

console.log('\n-------------------------------------------------------------');
console.log('Как подключить к Gemini:');
console.log('-------------------------------------------------------------');
console.log('1. В БРАУЗЕРЕ (gemini.google.com):');
console.log('   - Установите расширение "MCP SuperAssistant" в Google Chrome.');
console.log('   - В настройках расширения укажите путь к конфигурации:');
console.log(`     ${configPath}`);
console.log('   - Запустите локальный мост командой:');
console.log('     npx -y mcp-superassistant-host\n');

console.log('2. В АВТОНОМНЫХ АГЕНТАХ (Goose / Cline / Roo Code / Gemini CLI):');
console.log('   - Добавьте блок "mcpServers" из config/mcp_config.json');
console.log('   - Укажите ваш бесплатный ключ Google Gemini API в настройках.');
console.log('-------------------------------------------------------------\n');

const shouldRunHost = process.argv.includes('--start-host');

if (shouldRunHost) {
  console.log('⚡ Запуск локального MCP-моста для браузера...\n');
  const hostProcess = spawn(
    process.platform === 'win32' ? 'cmd.exe' : 'npx',
    process.platform === 'win32' ? ['/c', 'npx', '-y', 'mcp-superassistant-host', '--config', configPath] : ['-y', 'mcp-superassistant-host', '--config', configPath],
    { stdio: 'inherit' }
  );

  hostProcess.on('error', (err) => {
    console.error('Ошибка запуска mcp-superassistant-host:', err.message);
  });
} else {
  console.log('💡 Подсказка: Чтобы сразу запустить мост для браузера, выполните:');
  console.log('   npm start -- --start-host\n');
}
