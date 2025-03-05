import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        reporters: ["verbose", "html"],
        globals: true,
        mockReset: true,
        environment: "node",
        include: ['**\/*.{test,spec}.js'],
        coverage: {
            provider: "v8",
            reportsDirectory: "./coverage/",
            enabled: true,
            exclude: [...coverageConfigDefaults.exclude, "html"]
        }
    },
})