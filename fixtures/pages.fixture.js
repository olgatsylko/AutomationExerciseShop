// fixtures/pages.fixture.js
const { test: base, expect } = require('@playwright/test');
const { HomePage } = require('../pages/home-page');
const { LoginPage } = require('../pages/login-page');
const { SignupPage } = require('../pages/signup-page');
const { ProductsPage } = require('../pages/products-page');
const { CartPage } = require('../pages/cart-page');
const { CheckoutPage } = require('../pages/checkout-page');
const { PaymentPage } = require('../pages/payment-page');

// Список рекламных доменов, которые блокируем
const AD_DOMAINS = [
  /googleads/,
  /googlesyndication/,
  /doubleclick/,
  /adservice/,
  /popads/,
  /adnxs/,
  /amazon-adsystem/,
  /taboola/,
  /outbrain/,
];

const test = base.extend({
  // Переопределяем page — блокируем рекламу ДО открытия любой страницы
  page: async ({ page }, use) => {
    await page.route(/.*/, (route) => {
      const url = route.request().url();
      // Если это рекламный домен — блокируем
      if (AD_DOMAINS.some((pattern) => pattern.test(url))) {
        return route.abort();
      }
      // Всё остальное — пропускаем
      return route.continue();
    });
    await use(page);
  },

  homePage: async ({ page }, use) => use(new HomePage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  signupPage: async ({ page }, use) => use(new SignupPage(page)),
  productsPage: async ({ page }, use) => use(new ProductsPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  paymentPage: async ({ page }, use) => use(new PaymentPage(page)),
});

module.exports = { test, expect };