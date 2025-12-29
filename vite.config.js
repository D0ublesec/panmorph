import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// GitHub Pages with custom domain at root - base path is '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})

