import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Forward /api calls to the Spring Boot backend during development.
    // This avoids CORS entirely, since the browser only ever talks to Vite.
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
