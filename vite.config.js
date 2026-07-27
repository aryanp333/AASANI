import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project site: https://aryanp333.github.io/AASANI/
const base = process.env.GITHUB_PAGES === 'true' ? '/AASANI/' : '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
  ],
})
