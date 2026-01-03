import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    include: ['tests/integration/**/*.test.ts', 'tests/integration/**/*.spec.ts'],
    exclude: ['dist/**', 'node_modules/**'],
    testTimeout: 30000,
  },
})
