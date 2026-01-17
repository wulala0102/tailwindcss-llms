# tailwindcss-llms

Tailwind CSS 官方文档的 Markdown 格式版本，专为 LLM（大语言模型）优化。

## 特性

- 📦 自动从 [tailwindcss.com](https://github.com/tailwindlabs/tailwindcss.com) 拉取最新文档
- 📝 185 个文档文件，涵盖所有 Tailwind CSS 功能
- 🤖 纯 Markdown 格式，便于 LLM 读取和理解
- 🔄 安装时自动更新到最新版本
- 📄 包含 llms.txt 索引文件，列出所有文档及描述
- 📊 安装过程带进度条，清晰显示处理状态

## 安装

```bash
npm install tailwindcss-llms
```

或使用 yarn：

```bash
yarn add tailwindcss-llms
```

安装过程中会自动：
1. 下载 Tailwind CSS 官方文档仓库
2. 提取并转换文档为 Markdown 格式
3. 生成文档到 `node_modules/tailwindcss-llms/docs/` 目录
4. 生成 `llms.txt` 索引文件

## 使用

安装完成后，所有的 Markdown 文档都位于 `node_modules/tailwindcss-llms/docs/` 目录中。

### 使用包提供的 API

```javascript
const { getAllDocs, readDoc, getAllDocPaths } = require('tailwindcss-llms');

// 读取特定文档
const colorDoc = readDoc('colors.md');
console.log(colorDoc);

// 获取所有文档路径
const paths = getAllDocPaths();
console.log(`共有 ${paths.length} 个文档`);

// 获取所有文档内容
const allDocs = getAllDocs();
allDocs.forEach(doc => {
  console.log(`${doc.path}: ${doc.content.substring(0, 100)}...`);
});
```

### 直接读取文件

```javascript
const fs = require('fs');
const path = require('path');

// 读取特定文档
const colorDoc = fs.readFileSync(
  path.join(__dirname, 'node_modules/tailwindcss-llms/docs/colors.md'),
  'utf-8'
);

console.log(colorDoc);
```

### 与 LLM 集成

将文档内容作为上下文传递给 LLM：

```javascript
const { getAllDocs } = require('tailwindcss-llms');

// 获取所有文档
const docs = getAllDocs();

// 将文档格式化为 LLM 上下文
const context = docs.map(doc => {
  return `File: ${doc.path}\n\n${doc.content}`;
}).join('\n\n---\n\n');

// 传递给 LLM API
async function queryWithTailwindContext(question) {
  // 示例：使用 OpenAI API
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a Tailwind CSS expert. Use the following documentation to answer questions:\n\n" + context
      },
      {
        role: "user",
        content: question
      }
    ]
  });

  return response.choices[0].message.content;
}
```

### llms.txt 索引文件

包中包含了 `llms.txt` 文件，列出了所有 185 个文档的标题、路径和描述。格式示例：

```markdown
- [Colors](docs/colors.md) - Using and customizing the color palette in Tailwind CSS projects.
- [Dark mode](docs/dark-mode.md) - Using variants to style your site in dark mode.
- [Responsive design](docs/responsive-design.md) - Using responsive utility variants to build adaptive user interfaces.
```

读取方式：

```javascript
const fs = require('fs');
const path = require('path');

// 读取 llms.txt
const llmsTxt = fs.readFileSync(
  path.join(__dirname, 'node_modules/tailwindcss-llms/llms.txt'),
  'utf-8'
);

console.log(llmsTxt);
```

## 在 Claude Code 中使用

### 快速开始

1. **安装包**

在你的项目中安装 `tailwindcss-llms`：

```bash
npm install tailwindcss-llms
```

2. **提供文档给 Claude**

在对话中，你可以直接让 Claude 读取文档：

```
请阅读 node_modules/tailwindcss-llms/docs/colors.md 文件，告诉我如何使用 Tailwind 的颜色系统
```

或者使用 API：

```javascript
const { readDoc } = require('tailwindcss-llms');
const doc = readDoc('colors.md');
console.log(doc);
```

### 使用场景

#### 1. 学习 Tailwind CSS

```
我想学习 Tailwind CSS 的响应式设计，请阅读 node_modules/tailwindcss-llms/docs/responsive-design.md 并给我讲解
```

#### 2. 代码实现帮助

```
我需要实现一个深色模式切换功能，请参考 node_modules/tailwindcss-llms/docs/dark-mode.md 帮我实现
```

#### 3. 查找特定工具类

```
请查看 node_modules/tailwindcss-llms/llms.txt 找到所有关于 flex 布局的文档
```

#### 4. 批量查询

```javascript
// 创建一个脚本，让 Claude 执行
const { getAllDocs } = require('tailwindcss-llms');
const docs = getAllDocs();

// 查找所有包含 "animation" 的文档
const animationDocs = docs.filter(doc =>
  doc.path.includes('animation') ||
  doc.content.toLowerCase().includes('animation')
);

console.log(`找到 ${animationDocs.length} 个相关文档`);
animationDocs.forEach(doc => console.log(`- ${doc.path}`));
```

### 最佳实践

1. **查看索引** - 先查看 `llms.txt` 了解所有可用文档
2. **按需加载** - 只读取需要的文档，避免一次性加载所有内容
3. **结合实践** - 让 Claude 根据文档生成实际可用的代码示例
4. **保持更新** - 定期更新包以获取最新的 Tailwind CSS 文档

### 示例对话

```
你: 我想用 Tailwind 创建一个渐变背景的按钮

Claude: 让我先查看相关文档...
[读取 node_modules/tailwindcss-llms/docs/background-image.md]

根据文档，你可以这样创建渐变背景按钮：

<button class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded">
  渐变按钮
</button>

文档中还提到了其他渐变方向：
- bg-gradient-to-t (从下到上)
- bg-gradient-to-br (从左上到右下)
...
```

## 更新文档

要更新到最新的 Tailwind CSS 文档，只需重新安装包：

```bash
npm install tailwindcss-llms@latest
```

或者删除 node_modules 后重新安装：

```bash
rm -rf node_modules
npm install
```

## API 参考

该包提供以下 API：

### `getAllDocs()`

获取所有文档的内容。

```javascript
const { getAllDocs } = require('tailwindcss-llms');
const docs = getAllDocs();
// 返回: [{ path: 'colors.md', content: '...' }, ...]
```

### `readDoc(relativePath)`

读取指定文档。

```javascript
const { readDoc } = require('tailwindcss-llms');
const content = readDoc('colors.md');
```

### `getAllDocPaths()`

获取所有文档的文件路径。

```javascript
const { getAllDocPaths } = require('tailwindcss-llms');
const paths = getAllDocPaths();
// 返回: ['/absolute/path/to/docs/colors.md', ...]
```

### `docsDir`

文档目录的绝对路径。

```javascript
const { docsDir } = require('tailwindcss-llms');
console.log(docsDir); // '/path/to/node_modules/tailwindcss-llms/docs'
```

## 文档结构

生成的文档包含 185 个文件，涵盖：

- 🎨 样式工具类（颜色、字体、间距、布局等）
- 📐 响应式设计和状态变体
- ⚙️ 配置和自定义
- 🌙 深色模式
- 🎯 核心概念和最佳实践

所有文档均为纯 Markdown 格式，保持简洁易读。

## 开发

本地开发此包：

```bash
# 克隆仓库
git clone https://github.com/yourusername/tailwindcss-llms.git
cd tailwindcss-llms

# 安装（会自动拉取文档并生成）
npm install

# 手动重新生成文档
npm run postinstall
```

生成过程：
1. 从 GitHub 浅克隆 tailwindcss.com 仓库
2. 提取 `src/docs/` 目录中的 MDX 文件
3. 转换为纯 Markdown 格式
4. 生成带标题和描述的 llms.txt 索引文件
5. 显示实时进度条

整个过程约需 20-30 秒。

## 许可证

MIT

## 致谢

- [Tailwind CSS](https://tailwindcss.com) - 优秀的 CSS 框架
- [tailwindcss.com](https://github.com/tailwindlabs/tailwindcss.com) - 官方文档来源
