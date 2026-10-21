const { BasePage } = require('./base-page');

class HomePage extends BasePage {
  // --- Навигация (общая для всех страниц сайта) ---
  get navHome()        { return this.page.getByRole('link', { name: 'Home' }); }
  get navProducts()    { return this.page.getByRole('link', { name: 'Products' }); }
  get navCart()        { return this.page.getByRole('link', { name: 'Cart' }); }
  get navSignupLogin() { return this.page.getByRole('link', { name: 'Signup / Login' }); }
  get navContactUs()   { return this.page.getByRole('link', { name: 'Contact us' }); }
  get navTestCases()   { return this.page.getByRole('link', { name: 'Test Cases' }); }

  // --- Индикатор залогиненного пользователя ---
  get loggedInAs()     { return this.page.locator('a:has-text("Logged in as")'); }
  get deleteAccount()  { return this.page.getByRole('link', { name: 'Delete Account' }); }
  get logout()         { return this.page.getByRole('link', { name: 'Logout' }); }

  // --- Главная страница ---
  get slider()         { return this.page.locator('#slider'); }
  get featuresItems()  { return this.page.locator('.features_items'); }
  get recommendedItems() { return this.page.locator('#recommended-item-carousel'); }

  // --- Подписка (footer, есть на всех страницах) ---
  get subscriptionTitle() { return this.page.locator('.single-widget h2:has-text("Subscription")'); }
  get subscriptionEmail() { return this.page.locator('#susbscribe_email'); }
  get subscriptionBtn()   { return this.page.locator('#subscribe'); }
  get subscriptionSuccess() { return this.page.locator('.alert-success:has-text("successfully subscribed")'); }

  // --- Сообщения после создания/удаления аккаунта ---
  get accountCreated() { return this.page.getByText(/account created/i); }
  get accountDeleted() { return this.page.getByText(/account deleted/i); }
  get continueBtn()    { return this.page.locator('[data-qa="continue-button"]'); }

  async subscribe(email) {
    await this.subscriptionEmail.fill(email);
    await this.subscriptionBtn.click();
  }
}

module.exports = { HomePage };