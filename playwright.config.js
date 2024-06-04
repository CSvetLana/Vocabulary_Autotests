const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 120000,
  expect: {timeout:50000,},

  use: {
    headless: process.env.CI ? true : false,
    viewport: { width: 1280, height: 720 },
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://voc.fcqdaqp.online',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /* {
      name: "firefox",
      use: {...devices["Desktop Firefox"]},
  },
  {
      name: "webkit",
      use: {...devices["Desktop Safari"]},
  }, */
  ],
});