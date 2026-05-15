# jCandyPhoto

A minimalist, elegant photo blog built with Vue 3 and TypeScript. Designed for creators to showcase their photography and thoughts in a clean, aesthetic digital garden.

## 🌟 Features

- 📸 **Photography Showcase**: Beautifully presented photo galleries and albums.
- ✍️ **Markdown Support**: Integrated Markdown rendering for blog posts and descriptions.
- 📱 **Fully Responsive**: Optimized for various devices, from desktops to mobile phones.
- 🎨 **Modern UI**: Clean design using Element Plus and FontAwesome icons.
- ⚡ **Performant**: Powered by Vite for lightning-fast development and build.
- 🌑 **Aesthetic Design**: Carefully crafted layouts with a focus on visual storytelling.

## 🛠️ Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: [Vue Router](https://router.vuejs.org/)
- **UI Components**: [Element Plus](https://element-plus.org/)
- **Icons**: [FontAwesome](https://fontawesome.com/)
- **Styles**: [SCSS](https://sass-lang.com/)
- **Utils**: Axios, Day.js, VueUse, Dompurify, Marked

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- [pnpm](https://pnpm.io/) (Recommended) or npm/yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://gitee.com/hankJF/jcandyphoto.git
   cd jcandyphoto
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Build for production:
   ```bash
   pnpm build
   ```

## 📂 Project Structure

```text
src/
├── api/          # API services (axios instances)
├── assets/       # Global styles and static assets
├── components/   # Reusable UI components (Layout, Core, Common)
├── composables/  # Vue composables for logic reuse
├── plugins/      # External plugin configurations
├── router/       # Routing configuration
├── types/        # TypeScript interfaces and type definitions
├── utils/        # Helper functions and utilities
└── views/        # Main page components (Home, About, Albums, Photos)
```

## 📄 License

This project is licensed under the [Apache-2.0 License](LICENSE).

---

Developed with ❤️ by [jfx](https://gitee.com/hankJF).
