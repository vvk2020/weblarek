import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    hmr: {
      overlay: true // Показывать уведомления об ошибках HMR
    },
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  build: {
    sourcemap: true // Для отладки
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [
          './src/scss'
        ],
      },
    },
  },
})