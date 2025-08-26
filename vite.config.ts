import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ensure SPA routing works on Pages (history fallback handled by Pages)
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: { outDir: 'dist' }
})

export default defineConfig({
  plugins: [react()],
  build: { outDir: 'dist' }
})
>>>>>>> bb868bd (update to demo files)
