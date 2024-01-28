import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5001',
      '/socket.io/': 'http://localhost:5001',
      // '/api': {
      //   target: 'http://localhost:5001',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''),
      // }
    },
  },
  plugins: [react()],
});
