// tests/ui/authed/checkout.spec.js
const { test, expect } = require('../../../fixtures/pages.fixture');

test.describe('Checkout (already logged in via storageState)', () => {
  test('TC16: Place Order — login before checkout', async ({
    page, homePage, productsPage, cartPage, checkoutPage, paymentPage,
  }) => {
    // Блокируем рекламу — она может перекрывать элементы и ломать клики
    await page.route(
      /googleads|googlesyndication|doubleclick|adservice/,
      (route) => route.abort()
    );

    // --- 1. Открываем главную, проверяем, что залогинены через storageState ---
    await homePage.open();
    await expect(homePage.loggedInAs).toBeVisible();

    // --- 2. Переходим к продуктам ---
    await homePage.navProducts.click();
    await expect(page.url()).toContain('/products');

    // --- 3. Добавляем первый товар и переходим в корзину ---
    await productsPage.addProductAndGoToCart(0);

    // --- 4. Проверяем, что мы на странице корзины и корзина не пустая ---
    await expect(page.url()).toContain('/view_cart');

    // Конкретный товар найден на странице
    await expect(page.locator('h4:has-text("Blue Top")')).toBeVisible({ timeout: 20_000 });

    // Явная проверка отсутствия «Cart is empty!»
    await expect(cartPage.emptyCartMessage).toBeHidden();

    // --- 5. Proceed To Checkout ---
    // Кнопка видима (CSS-селектор a.check_out — стабильнее, чем getByRole)
    await expect(cartPage.proceedToCheckout).toBeVisible({ timeout: 15_000 });
    await cartPage.proceedToCheckout.click();

    // --- 6. Страница чекаута: адреса и заказ ---
    await expect(checkoutPage.addressDetailsTitle).toBeVisible();
    await expect(checkoutPage.reviewOrderTitle).toBeVisible();

    // --- 7. Place Order ---
    await checkoutPage.placeOrder('Test order via storageState');

    // --- 8. Оплата ---
    await paymentPage.pay({
      name: 'Test Card',
      number: '4111111111111111',
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2028',
    });

    // --- 9. Подтверждение заказа ---
    await expect(paymentPage.successMessage).toBeVisible();
  });
});