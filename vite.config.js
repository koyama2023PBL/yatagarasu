import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import env from 'vite-plugin-env-compatible'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    svgr(),
    env(),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  define: {
    global: 'window',
  }
})
