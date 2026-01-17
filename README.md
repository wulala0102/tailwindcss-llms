# tailwindcss-llms

> Tailwind CSS 官方文档的 Markdown 格式版本，专为 LLM（大语言模型）优化

## 快速开始

在 Claude Code 中运行：

```bash
/plugin marketplace add wulala0102/tailwindcss-llms
```

然后使用 `/tailwind-docs` 查询任何 Tailwind CSS 问题！

## 特性

- 📦 自动从 [tailwindcss.com](https://github.com/tailwindlabs/tailwindcss.com) 拉取最新文档
- 📝 185 个文档文件，涵盖所有 Tailwind CSS 功能
- 🤖 纯 Markdown 格式，便于 LLM 读取和理解
- 🔄 安装时自动更新到最新版本
- 📄 包含 llms.txt 索引文件，列出所有文档及描述
- 📊 安装过程带进度条，清晰显示处理状态
- ⚡️ 包含 Claude Code skill，便捷查询

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

安装完成后，最简单的使用方式是通过 Claude Code skill。

## 在 Claude Code 中使用

### 方式一：使用 Skill（推荐）

这个包包含一个内置的 Claude Code skill，提供最便捷的使用体验。

#### 通过插件市场安装（推荐）

最简单的安装方式是通过 Claude Code 插件市场：

```bash
/plugin marketplace add wulala0102/tailwindcss-llms
```

这会自动：
- 安装包
- 下载并生成 Tailwind CSS 文档
- 配置 skill
- 无需手动设置

#### 手动安装

如果需要手动安装：

1. **安装包**

```bash
npm install tailwindcss-llms
```

2. **验证**

Skill 会在以下情况激活：
- 输入 `/tailwind-docs` 命令
- 问题包含 "tailwind"、"tw" 或 "css" 关键词

#### 使用 Skill

直接在 Claude Code 中使用：

```bash
/tailwind-docs 如何在 Tailwind 中创建渐变背景？
```

或者自然对话（包含关键词时自动触发）：

```
我想用 Tailwind CSS 实现一个响应式的卡片布局
```

Skill 会自动：
- 查找相关文档
- 提供准确答案
- 给出代码示例
- 引用文档来源

#### 故障排查

如果 skill 没有工作：

1. 检查 skill 是否已正确链接：
   ```bash
   ls -la .claude/skills/tailwind-docs
   ```

2. 确认 skill 文件存在：
   ```bash
   ls node_modules/tailwindcss-llms/skills/tailwind-docs/
   ```

3. 重启 Claude Code

4. 显式使用 `/tailwind-docs` 命令测试

3. **示例对话**

```
你: /tailwind-docs 如何实现深色模式？

Claude: 让我查看深色模式文档...
[自动读取 docs/dark-mode.md]

Tailwind CSS 提供了 dark: 变体来实现深色模式。有三种策略：

1. 使用 media query (默认):
<div class="bg-white dark:bg-gray-800">
  内容
</div>

2. 使用 class 策略:
在 tailwind.config.js 中配置...
```

### 方式二：其他 LLM 工具

如果你使用其他 LLM 工具，可以：

1. **读取 llms.txt 索引**
   ```
   查看 node_modules/tailwindcss-llms/llms.txt 了解所有可用文档
   ```

2. **直接读取文档**
   ```
   读取 node_modules/tailwindcss-llms/docs/colors.md
   ```

3. **使用 API**（用于自定义工具）
   ```javascript
   const { getAllDocs, readDoc } = require('tailwindcss-llms');
   const doc = readDoc('colors.md');
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

如需编程访问文档（例如构建自定义工具），该包提供以下 API：

| API | 说明 | 示例 |
|-----|------|------|
| `getAllDocs()` | 获取所有文档 | `const docs = getAllDocs()` |
| `readDoc(path)` | 读取指定文档 | `const doc = readDoc('colors.md')` |
| `getAllDocPaths()` | 获取所有文档路径 | `const paths = getAllDocPaths()` |
| `docsDir` | 文档目录路径 | `console.log(docsDir)` |

详细用法请参考 [API 文档](./index.js)。

## 文档结构

生成的文档包含 185 个文件，涵盖：

- 🎨 样式工具类（颜色、字体、间距、布局等）
- 📐 响应式设计和状态变体
- ⚙️ 配置和自定义
- 🌙 深色模式
- 🎯 核心概念和最佳实践

所有文档均为纯 Markdown 格式，保持简洁易读。

## Claude Code Skill

该包包含一个开箱即用的 Claude Code skill，位于 `skills/tailwind-docs/`。

### 安装方式

**推荐：通过插件市场**

```bash
/plugin marketplace add wulala0102/tailwindcss-llms
```

插件市场会自动处理所有配置，无需手动设置。

**或：npm 安装**

如果你更喜欢使用 npm：

```bash
npm install tailwindcss-llms
```

然后 skill 会自动在 Claude Code 中可用。

### Skill 功能

- **自动文档查找** - 根据问题自动定位相关文档
- **智能回答** - 基于官方文档提供准确答案
- **代码示例** - 每个回答都包含实际可用的代码
- **文档引用** - 明确指出信息来源

### 触发方式

1. **显式调用**
   ```
   /tailwind-docs 如何使用 flex 布局？
   ```

2. **关键词触发**
   当你的问题包含 "tailwind"、"tw" 或 "css" 时，skill 可能会自动激活

3. **自然对话**
   ```
   我想让这个 div 在大屏幕上居中，小屏幕上占满宽度
   ```

### Skill 配置

Skill 配置文件：`skills/tailwind-docs/skill.json`

```json
{
  "name": "tailwind-docs",
  "version": "1.0.0",
  "description": "Query Tailwind CSS documentation",
  "triggerWords": ["tailwind", "tw", "css"],
  "userInvocable": true
}
```

### 自定义 Skill

你可以修改 `skills/tailwind-docs/prompt.md` 来自定义 skill 的行为：

1. 调整回答风格
2. 添加特定的文档优先级
3. 自定义代码示例格式

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
