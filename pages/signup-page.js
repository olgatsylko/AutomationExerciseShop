const { BasePage } = require('./base-page');

class SignupPage extends BasePage {
  get enterAccountInfoTitle() { return this.page.getByRole('heading', { name: 'Enter Account Information' }); }

  // Title
  get titleMr()  { return this.page.locator('#id_gender1'); }
  get titleMrs() { return this.page.locator('#id_gender2'); }

  // Account info
  get password()    { return this.page.locator('[data-qa="password"]'); }
  get birthDay()    { return this.page.locator('#days'); }
  get birthMonth()  { return this.page.locator('#months'); }
  get birthYear()   { return this.page.locator('#years'); }
  get newsletter()      { return this.page.locator('#newsletter'); }
  get specialOffers()   { return this.page.locator('#optin'); }

  // Address info
  get firstName()   { return this.page.locator('[data-qa="first_name"]'); }
  get lastName()    { return this.page.locator('[data-qa="last_name"]'); }
  get company()     { return this.page.locator('[data-qa="company"]'); }
  get address1()    { return this.page.locator('[data-qa="address"]'); }
  get address2()    { return this.page.locator('[data-qa="address2"]'); }
  get country()     { return this.page.locator('[data-qa="country"]'); }
  get state()       { return this.page.locator('[data-qa="state"]'); }
  get city()        { return this.page.locator('[data-qa="city"]'); }
  get zipcode()     { return this.page.locator('[data-qa="zipcode"]'); }
  get mobileNumber(){ return this.page.locator('[data-qa="mobile_number"]'); }
  get createAccountBtn() { return this.page.locator('[data-qa="create-account"]'); }

  /**
   * Полное заполнение формы регистрации (TC 1, шаги 9-12).
   * @param {object} user - данные пользователя
   */
  async fillAccountDetails(user) {
    await (user.title === 'Mrs' ? this.titleMrs : this.titleMr).check();
    await this.password.fill(user.password);
    await this.birthDay.selectOption(user.birthDate.day);
    await this.birthMonth.selectOption({ label: user.birthDate.month });
    await this.birthYear.selectOption(user.birthDate.year);
    if (user.newsletter) await this.newsletter.check();
    if (user.specialOffers) await this.specialOffers.check();
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    if (user.company) await this.company.fill(user.company);
    await this.address1.fill(user.address1);
    if (user.address2) await this.address2.fill(user.address2);
    await this.country.selectOption({ label: user.country });
    await this.state.fill(user.state);
    await this.city.fill(user.city);
    await this.zipcode.fill(user.zipcode);
    await this.mobileNumber.fill(user.mobileNumber);
    await this.createAccountBtn.click();
  }
}

module.exports = { SignupPage };