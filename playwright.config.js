// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  // Test directory where your test files are located
  testDir: './tests',

  // Timeout settings for tests and assertions
  timeout: 30 * 1000, // Global timeout for tests
  expect: {
    timeout: 5000, // Timeout for individual assertions
  },

  // Run tests sequentially, not in parallel
  fullyParallel: false,

  // Prevent tests with `test.only` in the code from running accidentally
  forbidOnly: !!process.env.CI,

  // Retry failed tests when running in CI
  retries: process.env.CI ? 2 : 0,

  // Run tests sequentially by limiting workers to 1
  workers: 1,

  // Reporter configuration, including the use of Allure
  reporter: [
    ['html', { open: 'never' }], // HTML reporter to view test results
    ['allure-playwright'], // Allure reporter for generating detailed reports
  ],

  // Shared settings for all test projects
  use: {
    // Base URL (uncomment if needed for specific base URL)
    // baseURL: 'http://127.0.0.1:3000',

    // Collect trace information on the first retry for debugging
    trace: 'on-first-retry',
  },

  // Configuring test projects for major browsers
  projects: [
    {
      name: 'chromium', // Chromium browser configuration
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1536, height: 864 },
        screenshot: 'on', // Enable screenshot capture
        video: 'on', // Enable video recording for test runs
        trace: 'on', // Collect trace for debugging
      },
    },
    {
      name: 'firefox', // Firefox browser configuration
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1536, height: 864 },
        screenshot: 'on',
        video: 'on',
        trace: 'on',
      },
    },
    {
      name: 'webkit', // Webkit (Safari) browser configuration
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1536, height: 864 },
        screenshot: 'on',
        video: 'on',
      },
    },
  ],

  // Optional: Set up a local server before starting tests
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI, // Reuse server if not in CI
  // },
});
