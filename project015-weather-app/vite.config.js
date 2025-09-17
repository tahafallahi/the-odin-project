// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000
  },
  esbuild: {
    sourcemap: false
  },
  // optional: log when config is loaded
  plugins: [
    {
      name: 'config-check',
      configResolved(resolvedConfig) {
        console.log('Vite config is loaded!', resolvedConfig);
      }
    }
  ]
});

