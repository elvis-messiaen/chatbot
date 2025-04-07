import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['@stomp/stompjs'],
  },
  server: {
    proxy: {
      '/websocket': {
        target: 'http://localhost:8080',
        ws: true,
      },
    },
  },
});
