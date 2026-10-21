const { BasePage } = require('./base-page');

class CheckoutPage extends BasePage {
  get addressDetailsTitle() { return this.page.getByRole('heading', { name: 'Address Details' }); }
  get reviewOrderTitle()    { return this.page.getByRole('heading', { name: 'Review Your Order' }); }
  get deliveryAddress()     { return this.page.locator('#address_delivery'); }
  get billingAddress()      { return this.page.locator('#address_invoice'); }
  get commentTextarea()     { return this.page.locator('textarea[name="message"]'); }
  get placeOrderBtn()       { return this.page.getByRole('link', { name: 'Place Order' }); }

  async placeOrder(comment) {
    await this.commentTextarea.fill(comment);
    await this.placeOrderBtn.click();
  }
}

module.exports = { CheckoutPage };