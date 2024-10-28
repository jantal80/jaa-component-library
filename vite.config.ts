import { defineConfig } from 'vite'
import { extname, relative, resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'node:path'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './lib/components')
    }
  },
  
  build: {
    target: 'esnext',
    minify: true,
    lib: {
      formats: ['es'],
      entry: resolve(__dirname, 'lib/index.tsx'),
      name: 'jaa-my-component-library',
      fileName: format => `jaa-my-component-library.${format}.js`
    },
    rollupOptions: {
      output: {
        sourcemapExcludeSources: true,
        globals:{
          react: 'React',
          'react/jsx-runtime': 'jsxRuntime'
        }
      }
    }
  },
  plugins: [
    peerDepsExternal(),
    react(),
    dts({ 
      rollupTypes: true, 
      include: ['lib'] })
  ],
})