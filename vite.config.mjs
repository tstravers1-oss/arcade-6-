import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    build: {
      outDir: 'dist',
      minify: 'terser',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'vendor-react';
              if (id.includes('lucide-react')) return 'vendor-lucide';
              if (id.includes('motion')) return 'vendor-motion';
              return 'vendor';
            }
          }
        }
      }
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    server: {
      port: 3000,
      host: '0.0.0.0'
    }
  };
});
