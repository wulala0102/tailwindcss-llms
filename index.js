const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, 'docs');

/**
 * 获取所有文档文件的路径
 * @returns {string[]} 文档文件路径数组
 */
function getAllDocPaths() {
  const paths = [];

  function traverse(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.md')) {
        paths.push(fullPath);
      }
    }
  }

  if (fs.existsSync(DOCS_DIR)) {
    traverse(DOCS_DIR);
  }

  return paths;
}

/**
 * 读取特定文档
 * @param {string} relativePath - 相对于 docs 目录的路径
 * @returns {string} 文档内容
 */
function readDoc(relativePath) {
  const fullPath = path.join(DOCS_DIR, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Document not found: ${relativePath}`);
  }
  return fs.readFileSync(fullPath, 'utf-8');
}

/**
 * 获取所有文档内容
 * @returns {Array<{path: string, content: string}>} 文档数组
 */
function getAllDocs() {
  const paths = getAllDocPaths();
  return paths.map(fullPath => ({
    path: path.relative(DOCS_DIR, fullPath),
    content: fs.readFileSync(fullPath, 'utf-8')
  }));
}

module.exports = {
  docsDir: DOCS_DIR,
  getAllDocPaths,
  readDoc,
  getAllDocs
};
