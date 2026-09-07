import { copyFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'

const dtsEntries = [
  'index.d.ts',
  'types/index.d.ts',
  'rules/index.d.ts',
  'tool/index.d.ts'
]

export default defineConfig({
  plugins: [
    dts({
      include: ['src'],
      exclude: ['src/**/*.test.ts'],
      afterBuild() {
        for (const file of dtsEntries) {
          copyFileSync(
            join('dist', file),
            join('dist', file.replace(/\.d\.ts$/, '.d.cts'))
          )
        }
      }
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
      formats: ['es', 'cjs']
    }
  },
  test: {
    include: ['src/**/*.test.ts']
  }
})
