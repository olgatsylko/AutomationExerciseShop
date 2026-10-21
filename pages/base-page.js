class BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
  }

  async open(path = '/') {
    await this.page.goto(path);
    await this.dismissAds(); // Автоматически закрываем баннеры
  }
  async dismissAds() {
    // Вариант 1: крестик закрытия
    const closeBtn = this.page.locator('.adsbygoogle, [id*="close"], .modal .close, button[aria-label="Close"]');
    if (await closeBtn.isVisible().catch(() => false)) {
      await closeBtn.first().click().catch(() => {});
  }

    // Вариант 2: клик по свободной области (за баннером)
    await this.page.mouse.click(10, 10).catch(() => {});
  }
}

module.exports = { BasePage };