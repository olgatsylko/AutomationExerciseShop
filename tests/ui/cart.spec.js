const { test, expect } = require('../../fixtures/pages.fixture');

const FIRST_PRODUCT = 'Blue Top';    // Rs. 500
const SECOND_PRODUCT = 'Men Tshirt'; // Rs. 400

test.describe('Cart', () => {
  test('TC12: Add Products in Cart', async ({ page, homePage, productsPage, cartPage }) => {
    await homePage.open();
    await homePage.navProducts.click();

    // Первый товар — добавляем и продолжаем
    await productsPage.addProductAndContinue(0);

    // Второй товар — добавляем и переходим в корзину
    await productsPage.addProductAndGoToCart(1);

    await expect(page.url()).toContain('/view_cart');
    await expect(cartPage.cartRows).toHaveCount(2);

    await expect(cartPage.cartRowPrice(FIRST_PRODUCT)).toContainText('Rs. 500');
    await expect(cartPage.cartRowQuantity(FIRST_PRODUCT)).toHaveText('1');
    await expect(cartPage.cartRowTotal(FIRST_PRODUCT)).toContainText('Rs. 500');
    await expect(cartPage.cartRowTotal(SECOND_PRODUCT)).toContainText('Rs. 400');
  });

  test('TC17: Remove Products From Cart', async ({ homePage, productsPage, cartPage }) => {
    await homePage.open();
    await homePage.navProducts.click();

    // Добавляем товар и переходим в корзину
    await productsPage.addProductAndGoToCart(0);

    await expect(cartPage.cartRows).toHaveCount(1);

    // Удаляем товар
    await cartPage.removeProduct(FIRST_PRODUCT);

    await expect(cartPage.cartRows).toHaveCount(0);
  });
});