import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins:[dts({
    rollupTypes: true
  })],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'VueGeetest4',
      fileName: 'vue-geetest4',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})