import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../server/public/client',
    emptyOutDir: true,
    assetsDir: 'assets',
  },
  base: '/client/',
})
