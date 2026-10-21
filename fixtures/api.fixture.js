const { test: base, expect } = require('@playwright/test');

const test = base.extend({
  /** Готовый API-клиент с baseURL из конфига */
  api: async ({ request }, use) => {
    use(request);
  },
});

module.exports = { test, expect };