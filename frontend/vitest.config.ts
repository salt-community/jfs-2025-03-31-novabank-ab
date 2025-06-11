import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom', // simulates a browser environment (for DOM elements)
    setupFiles: ['./tests/setup.ts'], // uses this file to set up stuff
    include: ['./tests/**/*.test.*'], // optional; says test files are here
    // globals: true, // very optional; exports symbols like describe, it, expect globally
    //  so you don't need to import them
  },
})
