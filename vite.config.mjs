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
    plugins: [
      react(),
      jsconfigPaths(),
      VitePWA({
        registerType: 'autoUpdate',
        strategies: 'injectManifest',
        srcDir: 'src/service-worker', // ✅ actual folder of your service worker
        filename: 'sw-push.js',             // ✅ will output to /dist/sw.js
        injectManifest: {
          globPatterns: ['**/*.{js,css,html,png,svg}'],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 // 5 MB
        },
        manifest,
        includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        devOptions: {
          enabled: false
        }
      })
    ],
    build: {
      chunkSizeWarningLimit: 1000
    }
  };
});
