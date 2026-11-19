import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  /**
   * Fail the CI run if a `test.only` was committed by accident,
   * so no test gets skipped silently
   */
  forbidOnly: !!process.env.CI,
  /**
   * Retry failed tests up to 2 times on CI to absorb flaky failures;
   * locally fail fast with no retry
   */
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    /**
     * Record a trace (DOM snapshots, actions, network)
     * only when a failed test is retried the first time;
     * open it with `npx playwright show-trace` to debug step by step
     */
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
