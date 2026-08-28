import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      include: ['src'],
      exclude: ['src/**/*.test.ts']
    })
  ],
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        'types/index': 'src/types/index.ts',
        'rules/index': 'src/rules/index.ts',
        'tool/index': 'src/tool/index.ts'
      },
      formats: ['es']
    }
  },
  test: {
    include: ['src/**/*.test.ts']
  }
})
