// vite.config.ts (or .js)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const detectBadSpecifier = {
  name: 'detect-bad-specifiers',
  enforce: "pre" as const,
  resolveId(id: string, importer: string | undefined) {
    // flag URL-ish or malformed module ids
    if (/^(?:\w+\+)?https(?!:)|^(?:\w+\+)?http(?!:)|^(?:git\+https|git\+ssh):|^https?:\/\/|^ws:\/\/|^wss:\/\/|^data:|^file:/i.test(id)) {
      console.log(`[suspect] id="${id}" importer="${importer || '<entry>'}"`)
    }
    return null
  },
}

export default defineConfig({
  plugins: [detectBadSpecifier, react()],
  build: { outDir: 'dist' },
})
