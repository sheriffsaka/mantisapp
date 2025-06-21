import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest.json';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const API_URL = `${env.VITE_APP_BASE_NAME}`;
  const PORT = 3000;

  return {
    server: {
      open: true,
      port: PORT,
      host: true
    },
    preview: {
      open: true,
      host: true
    },
    base: API_URL,
    resolve: {
      alias: []
    },
    plugins: [
      react(),
      jsconfigPaths(),
      VitePWA({
        registerType: 'autoUpdate',
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'sw-push.js', // ✅ Ensures correct file is used
        injectManifest: {
          globPatterns: ['**/*.{js,css,html,png,svg}'],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 // 5MB
        },
        manifest,
        includeAssets: [
          'favicon.svg',
          'favicon.ico',
          'robots.txt',
          'apple-touch-icon.png'
        ],
        devOptions: {
          enabled: false
        }
      })
    ],
    build: {
      chunkSizeWarningLimit: 1000 // Optional: silences chunk size warning
    }
  };
});
