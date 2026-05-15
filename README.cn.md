# jCandyPhoto

一个基于 Vue 3 和 TypeScript 构建的简约、优雅的摄影博客系统。旨在为创作者提供一个展示摄影作品和思想的数字花园。

[English Version](./README.en.md)

## 🌟 特性

- 📸 **作品展示**：优美的相册与照片展示布局。
- ✍️ **Markdown 支持**：集成 Markdown 渲染，适用于博客文章和描述。
- 📱 **响应式设计**：完美适配桌面、平板和手机等多种设备。
- 🎨 **现代 UI**：使用 Element Plus 和 FontAwesome 图标，设计简洁。
- ⚡ **高性能**：基于 Vite 构建，享受极致的开发与打包速度。
- 🌑 **美学设计**：精心打磨的布局，专注于视觉叙事。

## 🛠️ 技术栈

- **框架**：[Vue 3](https://vuejs.org/) (Composition API)
- **语言**：[TypeScript](https://www.typescriptlang.org/)
- **构建工具**：[Vite](https://vitejs.dev/)
- **状态管理**：[Pinia](https://pinia.vuejs.org/)
- **路由**：[Vue Router](https://router.vuejs.org/)
- **UI 组件库**：[Element Plus](https://element-plus.org/)
- **图标**：[FontAwesome](https://fontawesome.com/)
- **样式**：[SCSS](https://sass-lang.com/)
- **工具库**：Axios, Day.js, VueUse, Dompurify, Marked

## 🚀 快速开始

### 前置要求

- Node.js (建议使用最新的 LTS 版本)
- [pnpm](https://pnpm.io/) (推荐) 或 npm/yarn

### 安装步骤

1. 克隆仓库：
   ```bash
   git clone https://github.com/dsjfx/jfrs-candyphoto.git
   cd jcandyphoto
   ```

2. 安装依赖：
   ```bash
   pnpm install
   ```

3. 启动开发服务器：
   ```bash
   pnpm dev
   ```

4. 构建生产环境：
   ```bash
   pnpm build
   ```

## 📂 项目结构

```text
src/
├── api/          # 接口服务 (axios 实例)
├── assets/       # 全局样式与静态资源
├── components/   # 可复用组件 (Layout, Core, Common)
├── composables/  # 组合式函数 (逻辑复用)
├── plugins/      # 外部插件配置
├── router/       # 路由配置
├── types/        # TypeScript 接口与类型定义
├── utils/        # 工具函数
└── views/        # 页面组件 (首页, 关于, 相册, 照片)
```

## 📄 开源协议

本项目采用 [Apache-2.0 License](LICENSE) 开源协议。

---

由 [dsjfx](https://github.com/dsjfx) 用 ❤️ 开发。
