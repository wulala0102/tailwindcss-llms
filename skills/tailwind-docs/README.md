# Tailwind CSS Documentation Skill

这是一个 Claude Code skill，用于快速查询和使用 Tailwind CSS 官方文档。

## 使用方法

### 基本用法

```
/tailwind-docs 如何创建渐变背景？
```

### 示例对话

**例子 1: 查询颜色系统**
```
你: /tailwind-docs Tailwind 有哪些蓝色？

Claude: 让我查看颜色文档...
[读取 docs/colors.md]

Tailwind CSS 提供了完整的蓝色色板，从浅到深共 10 个等级：

- blue-50: #eff6ff (最浅)
- blue-100: #dbeafe
- blue-200: #bfdbfe
...
- blue-900: #1e3a8a
- blue-950: #172554 (最深)

使用方式：
<div class="bg-blue-500 text-white">
  蓝色背景
</div>
```

**例子 2: 实现响应式布局**
```
你: /tailwind-docs 如何让元素在移动端堆叠，桌面端并排？

Claude: 这是一个响应式布局问题，让我查看相关文档...
[读取 docs/responsive-design.md 和 docs/flex-direction.md]

使用 Tailwind 的响应式前缀和 flex 布局：

<div class="flex flex-col md:flex-row gap-4">
  <div class="flex-1">内容 1</div>
  <div class="flex-1">内容 2</div>
  <div class="flex-1">内容 3</div>
</div>

解释：
- flex-col: 默认垂直堆叠（移动端）
- md:flex-row: 中等屏幕及以上水平排列
- gap-4: 元素之间的间距
```

**例子 3: 深色模式**
```
你: /tailwind-docs 如何实现深色模式切换？

Claude: 让我查看深色模式文档...
[读取 docs/dark-mode.md]

Tailwind 提供三种深色模式策略...
```

## Skill 行为

该 skill 会：

1. 分析你的问题
2. 从 185 个文档中找到相关内容
3. 提供清晰的答案和代码示例
4. 注明文档来源

## 可用文档

所有文档位于 `node_modules/tailwindcss-llms/docs/`

查看完整列表：
```
node_modules/tailwindcss-llms/llms.txt
```

## 技巧

- 问题越具体，答案越准确
- 可以要求提供多个解决方案
- 可以要求解释某个概念
- 可以要求提供完整示例

## 限制

- 只能回答 Tailwind CSS 相关问题
- 答案基于包中的文档版本
- 复杂的设计问题可能需要多轮对话
