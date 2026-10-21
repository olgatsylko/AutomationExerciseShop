// pages/products-page.js
const { BasePage } = require('./base-page');
const { expect } = require('@playwright/test');

class ProductsPage extends BasePage {
  // ======== ЛОКАТОРЫ ========

  // Заголовки
  get allProductsTitle()     { return this.page.getByRole('heading', { name: 'All Products' }); }
  get searchedProducts() { return this.page.getByRole('heading', { name: 'Searched Products' }); }

  // Поиск
  get searchInput() { return this.page.locator('#search_product'); }
  get searchBtn()   { return this.page.locator('#submit_search'); }

  // Карточки товаров
  get productCards() { return this.page.locator('.product-image-wrapper'); }
  get productNames() { return this.page.locator('.productinfo p'); }

  // Модальное окно после добавления
  get modalContent()  { return this.page.locator('.modal-content'); }
  get modalViewCart() { return this.page.locator('.modal-content a[href="/view_cart"]'); }
  get modalContinue() { return this.page.locator('.modal-content .btn-success'); }

  // ======== МЕТОДЫ ========

  /** Открыть страницу продуктов */
  async open() {
    await this.page.goto('/products');
    await expect(this.allProductsTitle).toBeVisible({ timeout: 20_000 });
  }

  /** Поиск товара 
  async search(query) {
    await this.searchInput.fill(query);
    await this.searchBtn.click();
    await expect(this.searchedProducts).toBeVisible({ timeout: 20_000 });
  }*/

   /**
   * Поиск товара по названию.
   * @param {string} query — поисковый запрос
   */
  async search(query) {
    await this.searchInput.waitFor({ state: 'visible', timeout: 20_000 });
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');

    try {
      await this.page.waitForURL(`**/products?search=${encodeURIComponent(query)}`, { timeout: 10_000 });
    } catch {
      // Enter не сработал — пробуем клик по кнопке с force
      await this.searchBtn.click({ force: true, timeout: 10_000 });
      await this.page.waitForURL(`**/products?search=${encodeURIComponent(query)}`, { timeout: 20_000 });
    }
    await expect(this.productCards.first()).toBeVisible({ timeout: 20_000 });
  }

  /**
   * Добавить товар в корзину по индексу.
   * @param {number} index — индекс товара (0-based)
   */
  async addProductToCart(index) {
    const addToCartBtn = this.productCards.nth(index).locator('.productinfo .add-to-cart');
    const addedModal = this.modalContent.filter({ hasText: 'Added' });
    await addToCartBtn.click();
    try {
      await addedModal.waitFor({ state: 'visible', timeout: 10_000 });
    } catch {
      // Первый клик не сработал (JS не догрузился / флак) — пробуем второй раз
      await this.page.waitForTimeout(2000);
      await addToCartBtn.click();
      await addedModal.waitFor({ state: 'visible', timeout: 20_000 });
    }
  }

  /**
   * Добавить товар и перейти в корзину.
   * @param {number} index — индекс товара
   */
  async addProductAndGoToCart(index) {
    await this.addProductToCart(index);
    // Модалка точно открыта (addProductToCart это гарантирует) — закрываем её через Continue Shopping и идём в корзину через goto.
    await this.modalContinue.click();
    await this.page.goto('/view_cart');
  }

  /**
   * Добавить товар и продолжить покупки (для нескольких товаров).
   * @param {number} index — индекс товара
   */
  async addProductAndContinue(index) {
    await this.addProductToCart(index);
    await this.modalContinue.click();
    await expect(this.modalContent.filter({ hasText: 'Added' })).toBeHidden({ timeout: 10_000 });
  }
    /**
   * Кликнуть по ссылке "View Product" внутри карточки товара.
   * @param {number} index — индекс товара (0-based)
   */
  async viewProduct(index) {
    await this.productCards.nth(index).locator('a[href*="/product_details/"]').click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { ProductsPage };