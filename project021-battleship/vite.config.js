// vite.config.js

export default {
  optimizeDeps: {
    exclude: [
      "@babel/core",
      "@babel/preset-env",
      "@babel/preset-typescript",
      "@babel/types"
    ],
  },
  build: {
    commonjsOptions: {
      // ensure Vite doesn't try to process Node-only packages
      exclude: [
        "@babel/core/**",
        "@babel/preset-env/**",
        "@babel/preset-typescript/**",
        "@babel/types/**"
      ]
    }
  }
};