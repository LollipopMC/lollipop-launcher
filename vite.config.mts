import process from 'node:process'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import i18nextLoader from 'vite-plugin-i18next-loader'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // Tauri expects a fixed port, fail if that port is not available
  server: {
    strictPort: true,
    port: 2000,
  },
  // to access the Tauri environment variables set by the CLI with information about the current target
  envPrefix: ['VITE_', 'TAURI_PLATFORM', 'TAURI_ARCH', 'TAURI_FAMILY', 'TAURI_PLATFORM_VERSION', 'TAURI_PLATFORM_TYPE', 'TAURI_DEBUG'],
  build: {
    // Tauri uses Chromium on Windows and WebKit on macOS and Linux
    target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  plugins: [
    tsconfigPaths(),
    i18nextLoader({
      namespaceResolution: 'basename',
      paths: ['./locales'],
    }),
    react(),
    dts({ rollupTypes: true }),
    createHtmlPlugin({
      minify: true,
      template: 'src/public/index.html',
      entry: 'src/index.tsx',
    }),
  ],
})
