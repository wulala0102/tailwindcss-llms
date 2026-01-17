# 快速开始指南

## 安装

```bash
npm install tailwindcss-llms
```

安装过程会自动：
1. 从 GitHub 拉取最新的 Tailwind CSS 文档
2. 转换为 Markdown 格式
3. 生成 llms.txt 索引文件
4. 安装 Claude Code skill

约需 20-30 秒，会显示进度条。

## 在 Claude Code 中使用

### 最简单的方式

直接在 Claude Code 中提问：

```
/tailwind-docs 如何创建渐变背景？
```

### 更多示例

**查询颜色**
```
/tailwind-docs Tailwind 有哪些红色？
```

**实现布局**
```
/tailwind-docs 如何实现两栏布局，左侧固定宽度，右侧自适应？
```

**响应式设计**
```
/tailwind-docs 如何让元素在手机上隐藏，在桌面上显示？
```

**深色模式**
```
/tailwind-docs 如何实现深色模式？
```

## 使用 API

```javascript
const { getAllDocs, readDoc } = require('tailwindcss-llms');

// 读取特定文档
const colorDoc = readDoc('colors.md');
console.log(colorDoc);

// 获取所有文档
const allDocs = getAllDocs();
console.log(`共有 ${allDocs.length} 个文档`);
```

## 查看所有可用文档

```bash
cat node_modules/tailwindcss-llms/llms.txt
```

或在 Claude Code 中：

```
请显示 node_modules/tailwindcss-llms/llms.txt 的内容
```

## 技巧

1. **具体问题** - 问题越具体，答案越准确
2. **查看索引** - 先看 llms.txt 了解有哪些文档
3. **多次对话** - 复杂问题可以分步骤询问
4. **要求示例** - 明确要求提供代码示例

## 下一步

- 阅读完整的 [README.md](./README.md)
- 查看 [Skill 文档](./skills/tailwind-docs/README.md)
- 浏览 [API 参考](./README.md#api-参考)

## 常见问题

**Q: Skill 不工作？**
A: 确保已安装包，并在项目目录中使用 Claude Code

**Q: 如何更新文档？**
A: 运行 `npm install tailwindcss-llms@latest`

**Q: 如何自定义 Skill？**
A: 编辑 `skills/tailwind-docs/prompt.md`

**Q: 支持哪些 Tailwind 版本？**
A: 始终是最新版本，因为从官方仓库拉取
