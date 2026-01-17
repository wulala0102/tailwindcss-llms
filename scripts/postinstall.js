const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { generateMarkdown, generateLLMsTxt } = require('./generate-markdown');

const REPO_URL = 'https://github.com/tailwindlabs/tailwindcss.com';
const TEMP_DIR = path.join(__dirname, '../temp-repo');
const OUTPUT_DIR = path.join(__dirname, '../docs');

console.log('🚀 Setting up tailwindcss-llms...');

try {
  // 清理临时目录
  if (fs.existsSync(TEMP_DIR)) {
    console.log('🧹 Cleaning up old files...');
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }

  // 浅克隆仓库（只克隆最新版本，节省时间和空间）
  console.log('📥 Fetching latest Tailwind CSS documentation...');
  execSync(`git clone --depth 1 --single-branch ${REPO_URL} ${TEMP_DIR}`, {
    stdio: 'inherit'
  });

  // 生成 Markdown 文档
  const generatedFiles = generateMarkdown(TEMP_DIR, OUTPUT_DIR);

  // 生成 llms.txt
  generateLLMsTxt(OUTPUT_DIR, generatedFiles);

  // 清理临时目录
  console.log('🧹 Cleaning up temporary files...');
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });

  console.log('✨ Setup completed! Markdown documentation is ready in docs/ directory.');
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  // 清理临时目录（如果存在）
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
  process.exit(1);
}
