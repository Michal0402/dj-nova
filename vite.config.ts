import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { seoPlugin } from './seo.plugin.ts'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), ...(isSsrBuild ? [] : [seoPlugin()])],
  build: isSsrBuild
    ? { target: 'node20', outDir: '.ssr', emptyOutDir: true, copyPublicDir: false }
    : {
        target: 'es2022',
        cssCodeSplit: true,
        rollupOptions: {
          input: {
            main: resolve(import.meta.dirname, 'index.html'),
            privacy: resolve(import.meta.dirname, 'polityka-prywatnosci.html'),
          },
        },
      },
}))
