import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    global: 'window',
  },
  optimizeDeps: {
    include: ['sockjs-client'],
  },
});
