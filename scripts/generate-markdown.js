const fs = require('fs');
const path = require('path');

/**
 * 从MDX/MD文件提取元数据
 */
function extractMetadata(content) {
  const metadata = { title: '', description: '' };

  // 尝试提取 export const title
  const titleMatch = content.match(/export const title = ["'](.+?)["'];/);
  if (titleMatch) {
    metadata.title = titleMatch[1];
  }

  // 尝试提取 export const description
  const descMatch = content.match(/export const description = ["'](.+?)["'];/);
  if (descMatch) {
    metadata.description = descMatch[1];
  }

  return metadata;
}

/**
 * 从MDX/MD文件提取内容并转换为纯Markdown
 */
function extractMarkdownFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // 移除frontmatter
  let markdown = content.replace(/^---[\s\S]*?---\n/m, '');

  // 移除JSX导入语句
  markdown = markdown.replace(/^import\s+.*$/gm, '');

  // 简化JSX组件为Markdown（基础处理）
  markdown = markdown.replace(/<([A-Z][A-Za-z0-9]*)[^>]*>([\s\S]*?)<\/\1>/g, '$2');

  // 清理空行
  markdown = markdown.replace(/\n{3,}/g, '\n\n');

  return markdown.trim();
}

/**
 * 统计目录中的文档文件数量
 */
function countMarkdownFiles(dir) {
  let count = 0;
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      count += countMarkdownFiles(fullPath);
    } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
      count++;
    }
  }

  return count;
}

/**
 * 递归处理目录中的文档文件
 */
function processDirectory(sourceDir, targetDir, relativePath = '', generatedFiles = [], progress = { current: 0, total: 0 }) {
  const currentSource = path.join(sourceDir, relativePath);
  const currentTarget = path.join(targetDir, relativePath);

  if (!fs.existsSync(currentSource)) {
    return generatedFiles;
  }

  const items = fs.readdirSync(currentSource);

  for (const item of items) {
    const sourcePath = path.join(currentSource, item);
    const targetPath = path.join(currentTarget, item);
    const stat = fs.statSync(sourcePath);

    if (stat.isDirectory()) {
      // 递归处理子目录
      fs.mkdirSync(targetPath, { recursive: true });
      processDirectory(sourceDir, targetDir, path.join(relativePath, item), generatedFiles, progress);
    } else if (stat.isFile() && (item.endsWith('.md') || item.endsWith('.mdx'))) {
      // 处理Markdown文件
      try {
        const content = fs.readFileSync(sourcePath, 'utf-8');
        const metadata = extractMetadata(content);
        const markdown = extractMarkdownFromFile(sourcePath);
        const outputFile = targetPath.replace(/\.mdx?$/, '.md');
        fs.writeFileSync(outputFile, markdown, 'utf-8');
        const relativeOutput = path.relative(targetDir, outputFile);

        progress.current++;
        const percentage = Math.round((progress.current / progress.total) * 100);
        const bar = '█'.repeat(Math.floor(percentage / 2)) + '░'.repeat(50 - Math.floor(percentage / 2));

        // 清除当前行并显示进度
        process.stdout.write(`\r  [${bar}] ${percentage}% (${progress.current}/${progress.total}) ${relativeOutput.substring(0, 40).padEnd(40, ' ')}`);

        generatedFiles.push({
          path: relativeOutput,
          title: metadata.title,
          description: metadata.description
        });
      } catch (error) {
        console.error(`\n  ✗ Error processing ${sourcePath}:`, error.message);
      }
    }
  }

  return generatedFiles;
}

/**
 * 生成Markdown文档
 */
function generateMarkdown(repoDir, outputDir) {
  console.log('📝 Generating markdown files...');

  // 清理输出目录
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });

  // 可能的文档目录位置
  const possibleDocsDirs = [
    path.join(repoDir, 'src/docs'),
    path.join(repoDir, 'src/pages/docs'),
    path.join(repoDir, 'src/pages'),
    path.join(repoDir, 'docs'),
    path.join(repoDir, 'content')
  ];

  let docsDir = null;
  for (const dir of possibleDocsDirs) {
    if (fs.existsSync(dir)) {
      docsDir = dir;
      console.log(`📂 Found docs directory: ${path.relative(repoDir, dir)}`);
      break;
    }
  }

  if (!docsDir) {
    throw new Error('Documentation directory not found in repository');
  }

  // 统计文件总数
  const totalFiles = countMarkdownFiles(docsDir);
  console.log(`📊 Found ${totalFiles} markdown files to process`);

  // 处理文档目录
  const progress = { current: 0, total: totalFiles };
  const generatedFiles = processDirectory(docsDir, outputDir, '', [], progress);

  // 换行并显示完成信息
  console.log('\n✅ Markdown generation completed');

  return generatedFiles;
}

/**
 * 生成 llms.txt 文件
 */
function generateLLMsTxt(outputDir, generatedFiles) {
  console.log('📄 Generating llms.txt...');

  const lines = [
    '# Tailwind CSS Documentation',
    '',
    'This package provides Tailwind CSS documentation in markdown format, optimized for Large Language Models (LLMs).',
    '',
    '## Documentation Files',
    '',
    'All documentation files are located in the `docs/` directory.',
    'Total files: ' + generatedFiles.length,
    '',
    '## Available Documents',
    ''
  ];

  // 按字母顺序排序文件
  const sortedFiles = [...generatedFiles].sort((a, b) => a.path.localeCompare(b.path));

  // 添加文档列表
  for (const file of sortedFiles) {
    const title = file.title || file.path.replace('.md', '');
    const desc = file.description ? ` - ${file.description}` : '';

    lines.push(`- [${title}](docs/${file.path})${desc}`);
  }

  lines.push('');
  lines.push('## Usage');
  lines.push('');
  lines.push('```javascript');
  lines.push('const { getAllDocs, readDoc } = require("tailwindcss-llms");');
  lines.push('');
  lines.push('// Get all documents');
  lines.push('const docs = getAllDocs();');
  lines.push('');
  lines.push('// Read a specific document');
  lines.push('const doc = readDoc("colors.md");');
  lines.push('```');
  lines.push('');

  const llmsTxtPath = path.join(outputDir, '../llms.txt');
  fs.writeFileSync(llmsTxtPath, lines.join('\n'), 'utf-8');

  console.log('✅ llms.txt generated');
}

module.exports = { generateMarkdown, generateLLMsTxt };
