const { BasePage } = require('./base-page');

class PaymentPage extends BasePage {
  get nameOnCard()   { return this.page.locator('input[name="name_on_card"]'); }
  get cardNumber()   { return this.page.locator('input[name="card_number"]'); }
  get cvc()          { return this.page.locator('input[name="cvc"]'); }
  get expiryMonth()  { return this.page.locator('input[name="expiry_month"]'); }
  get expiryYear()   { return this.page.locator('input[name="expiry_year"]'); }
  get payAndConfirm() { return this.page.getByRole('button', { name: 'Pay and Confirm Order' }); }
  get orderPlaced()  { return this.page.getByRole('heading', { name: 'Order Placed!' }); }
  get successMessage() { return this.page.getByText(/congratulations! your order has been confirmed/i); }
  get downloadInvoice() { return this.page.getByRole('link', { name: 'Download Invoice' }); }

  async pay(card) {
    await this.nameOnCard.fill(card.name);
    await this.cardNumber.fill(card.number);
    await this.cvc.fill(card.cvc);
    await this.expiryMonth.fill(card.expiryMonth);
    await this.expiryYear.fill(card.expiryYear);
    await this.payAndConfirm.click();
  }
}

module.exports = { PaymentPage };