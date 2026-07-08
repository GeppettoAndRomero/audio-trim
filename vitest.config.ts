import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

// Unit tests run in Node (pure functions). Component tests opt into jsdom via a
// `// @vitest-environment jsdom` docblock. E2E lives in Playwright, not here.
export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  esbuild: { jsx: 'automatic', jsxImportSource: 'preact' },
  test: {
    include: ['tests/unit/**/*.test.ts', 'tests/component/**/*.test.tsx'],
    environment: 'node',
    // jsdom (used by component tests and storage-backed unit tests via docblock)
    // needs a real origin or localStorage is a non-functional opaque-origin stub.
    environmentOptions: { jsdom: { url: 'http://localhost/' } },
    setupFiles: ['tests/setup/vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: 'coverage',
      // Scope to genuinely unit-testable modules. `decodeAudioFile` in audioEngine.ts
      // needs a real AudioContext and is covered by the Playwright e2e suite instead;
      // the rest of audioEngine.ts (range math, MP3 encoding) is pure and covered here.
      include: [
        'src/utils/appError.ts',
        'src/utils/fileValidation.ts',
        'src/utils/timecode.ts',
        'src/utils/waveform.ts',
        'src/utils/audioEngine.ts',
      ],
      thresholds: { lines: 80, functions: 80, statements: 80, branches: 75 },
    },
  },
});
