import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['assets/js/**/*.js'],
      thresholds: {
        lines: 100,
        functions: 100,
        statements: 100,
        branches: 90
      }
    }
  }
});
