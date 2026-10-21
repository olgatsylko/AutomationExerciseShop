const { BasePage } = require('./base-page');

class CartPage extends BasePage {
  get shoppingCartTitle() { return this.page.getByRole('heading', { name: 'Shopping Cart' }); }
  get proceedToCheckout() { return this.page.locator('a.check_out'); }
  get emptyCartMessage() { return this.page.getByText(/cart is empty/i); }

  // Строка корзины = строка с кнопкой удаления И ценой (у шаблона-заглушки цены нет)
  get cartRows() { return this.page.locator('tr:has(.cart_quantity_delete):has(.cart_price)'); }

  cartRowByProduct(name) {
    return this.cartRows.filter({ has: this.page.locator(`h4:has-text("${name}")`) });
  }
  cartRowPrice(name)    { return this.cartRowByProduct(name).locator('.cart_price'); }
  cartRowQuantity(name) { return this.cartRowByProduct(name).locator('.cart_quantity'); }
  cartRowTotal(name)    { return this.cartRowByProduct(name).locator('.cart_total'); }
  cartRowDelete(name)   { return this.cartRowByProduct(name).locator('.cart_quantity_delete'); }

  async removeProduct(name) {
    await this.cartRowDelete(name).click();
  }
}

module.exports = { CartPage };