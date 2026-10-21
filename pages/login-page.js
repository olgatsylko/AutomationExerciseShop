const { BasePage } = require('./base-page');

class LoginPage extends BasePage {
  // --- Секция "Login to your account" ---
  get loginTitle()     { return this.page.getByRole('heading', { name: 'Login to your account' }); }
  get loginEmail()     { return this.page.locator('[data-qa="login-email"]'); }
  get loginPassword()  { return this.page.locator('[data-qa="login-password"]'); }
  get loginBtn()       { return this.page.locator('[data-qa="login-button"]'); }
  get loginError()     { return this.page.getByText('Your email or password is incorrect!'); }

  // --- Секция "New User Signup!" ---
  get signupTitle()    { return this.page.getByRole('heading', { name: 'New User Signup!' }); }
  get signupName()     { return this.page.locator('[data-qa="signup-name"]'); }
  get signupEmail()    { return this.page.locator('[data-qa="signup-email"]'); }
  get signupBtn()      { return this.page.locator('[data-qa="signup-button"]'); }
  get signupError()    { return this.page.getByText('Email Address already exist!'); }

  async login(email, password) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginBtn.click();
  }

  async startSignup(name, email) {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupBtn.click();
  }
}

module.exports = { LoginPage };