import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For GitHub Pages: Update the base path to match your repository name
// If deploying to root domain (username.github.io), change base to '/'
// For project pages (username.github.io/repo-name), use '/repo-name/'
export default defineConfig({
  plugins: [react()],
  // Change this to your repository name for GitHub Pages
  base: process.env.NODE_ENV === 'production' ? '/panmorph' : '/',
})

