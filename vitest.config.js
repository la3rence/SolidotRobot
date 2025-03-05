import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        reporters: ["verbose", "html"],
        globals: true,
        mockReset: true,
        environment: "node",
        coverage: {
            provider: "v8",
            reportsDirectory: "./coverage/",
            enabled: true
        }
    },
})