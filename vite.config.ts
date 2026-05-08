import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@/assets/styles/variables.scss' as *;
          @use '@/assets/styles/mixins.scss' as *;
        `
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3001,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:6060',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // 生产构建优化
    target: 'es2015', // 使用ES2015+以获得更好的Tree-shaking
    minify: 'terser', // 压缩时进一步移除死代码
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks: {
          // 代码分割，配合Tree-shaking
          'vendor': ['vue', 'vue-router']
        }
      }
    }
  },
});
