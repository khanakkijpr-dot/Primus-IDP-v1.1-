import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright Configuration for Primus IDP Browser Testing
 * Integrated with VS Code for 2-way communication and validation
 */
export default defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: 1,
    reporter: [
        ["html", { outputFolder: "docs/ai-browser-tests/playwright-report" }],
        ["json", { outputFile: "docs/ai-browser-tests/results.json" }],
        ["list"],
    ],
    use: {
        baseURL: process.env.PRIMUS_IDP_BASE_URL || "http://localhost:8001",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        headless: process.env.HEADLESS !== "false",
    },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],

    webServer: {
        command: "echo 'Primus IDP services should already be running'",
        url: "http://localhost:8001",
        reuseExistingServer: true,
        timeout: 5000,
    },
});
