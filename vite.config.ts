import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@sources': path.resolve(__dirname, 'src/sources'),
      '@tests': path.resolve(__dirname, 'src/__tests__'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
});
