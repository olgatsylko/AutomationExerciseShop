// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }]],

  use: {
    baseURL: 'https://automationexercise.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 15_000,
  },

  projects: [
    // 1. Логинится и создаёт playwright/.auth/user.json
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/,
    },

    // 2. UI-тесты с готовой сессией (storageState)
    {
      name: 'ui-authed',
      testDir: './tests/ui/authed',
      testMatch: /.*\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    // 3. Обычные UI-тесты (папку authed исключаем)
    {
      name: 'ui',
      testDir: './tests/ui',
      testMatch: /.*\.spec\.js/,
      testIgnore: /authed/,
      use: { ...devices['Desktop Chrome'] },
    },

    // 4. API-тесты
    {
      name: 'api',
      testDir: './tests/api',
      testMatch: /.*\.spec\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});