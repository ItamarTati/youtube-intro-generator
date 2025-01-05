import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { InlineConfig } from 'vitest/node';
import type { UserConfig } from 'vite';
interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/youtube-intro-generator/",
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
} as VitestConfigExport)
