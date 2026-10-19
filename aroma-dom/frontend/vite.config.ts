import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // Запросы к API уходят на бэкенд, отдельная настройка CORS не нужна
    proxy: { '/api': 'http://localhost:3000' },
  },
})
