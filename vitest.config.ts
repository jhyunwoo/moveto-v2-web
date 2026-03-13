import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  test: {
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    exclude: ['tests/e2e/**', 'coverage/**', 'test-results/**', 'playwright-report/**'],
    environment: 'jsdom',
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'app/api/share/route.ts',
        'app/api/user/shares/[page]/route.ts',
        'app/components/sign-in-button.tsx',
        'app/components/sign-out-button.tsx',
        'lib/decode-uri-share-code.ts',
        'lib/get-share-time-options-for-plan.ts',
        'lib/get-user-limit.ts',
      ],
    },
  },
})
