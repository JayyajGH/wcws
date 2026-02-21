import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8', 
      reporter: ['text', 'html'],
      include: ['**/*.{ts,tsx}'],
      exclude: [
        'node_modules/**',
        'next.config.js',
        'postcss.config.js',
        'tailwind.config.js',
        'vitest.setup.ts',
        '**/.next/**',
        'next-env.d.ts',
        'next.config.ts',
        '**/components/theme-provider.tsx',
      ],
    },
  },
});
