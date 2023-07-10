import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [react()],
    test: {
        name: 'happy-dom',
        environment: 'happy-dom',
        reporters: 'verbose',
        globals: true,
        setupFiles: './src/tests/setup.js'
    },
})