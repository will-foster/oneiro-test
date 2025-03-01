import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables global `describe` and `test`
    environment: "jsdom", // Required for React component testing
    setupFiles: "./setupTests.ts",
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly", // This ensures the class names are camelCased in JS
    },
  },
});
