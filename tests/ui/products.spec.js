const { test, expect } = require('../../fixtures/pages.fixture');

test.describe('Products', () => {
  test('TC8: All Products and product detail page', async ({ page, homePage, productsPage }) => {
    await homePage.open();
    await homePage.navProducts.click();

    await expect(page.url()).toContain('/products');
    await expect(productsPage.allProductsTitle).toBeVisible();
    await expect(productsPage.productCards.first()).toBeVisible();

    // Переходим к деталям первого товара
    await productsPage.viewProduct(0);

    await expect(page.url()).toContain('/product_details/');
    await expect(page.locator('.product-information h2')).toBeVisible();
    await expect(page.getByText('Category:').first()).toBeVisible();
    await expect(page.getByText('Availability:').first()).toBeVisible();
    await expect(page.getByText('Condition:').first()).toBeVisible();
    await expect(page.getByText('Brand:').first()).toBeVisible();
  });

  test('TC9: Search Product', async ({ page, homePage, productsPage }) => {
    await homePage.open();
    await homePage.navProducts.click();

    await productsPage.search('blue top');

    // Проверяем, что результаты есть
    await expect(page.getByText('Blue Top').first()).toBeVisible();
  });
});