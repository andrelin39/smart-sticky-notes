import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/smart-sticky-notes/',
  build: {
    outDir: 'dist',
  },
})
