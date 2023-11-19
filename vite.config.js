import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    svgr()
  ],
  build: {
    rollupOptions: {
      input: './src/index.tsx',
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  }
})
