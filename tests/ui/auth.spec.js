const { test, expect } = require('../../fixtures/pages.fixture');

// Тот же пользователь, что в auth.setup.js.
// Если регистрировала вручную с другим именем — поправь name.
const REGISTERED_USER = {
  name: 'Storage Test',
  email: 'qa_storage_test@gmail.com',
  password: 'StorageTest123!',
};

function uniqueEmail() {
  return `qa_${Date.now()}@test.com`;
}

test.describe('Authentication', () => {
  test('TC1: Register User', async ({ page, homePage, loginPage, signupPage }) => {
    const email = uniqueEmail();

    await homePage.open();
    await homePage.navSignupLogin.click();
    await expect(loginPage.signupTitle).toBeVisible();

    await loginPage.startSignup('Test User', email);
    await expect(signupPage.enterAccountInfoTitle).toBeVisible();

    await signupPage.fillAccountDetails({
      title: 'Mr',
      password: 'Password123!',
      birthDate: { day: '15', month: 'June', year: '1995' },
      newsletter: true,
      specialOffers: true,
      firstName: 'Test',
      lastName: 'User',
      company: 'Test Company',
      address1: 'Test Street 1',
      address2: 'Apt 2',
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      zipcode: '90001',
      mobileNumber: '1234567890',
    });

    await expect(page.url()).toContain('/account_created');
    await expect(homePage.accountCreated).toBeVisible();
    await homePage.continueBtn.click();

    await expect(homePage.loggedInAs).toContainText('Test User');

    // Чистим за собой
    await homePage.deleteAccount.click();
    await expect(homePage.accountDeleted).toBeVisible();
    await homePage.continueBtn.click();
  });

  test('TC2: Login with correct credentials', async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.navSignupLogin.click();
    await expect(loginPage.loginTitle).toBeVisible();

    await loginPage.login(REGISTERED_USER.email, REGISTERED_USER.password);
    await expect(homePage.loggedInAs).toContainText(REGISTERED_USER.name);
  });

  test('TC3: Login with incorrect credentials', async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.navSignupLogin.click();

    await loginPage.login('wrong@test.com', 'wrongpass');
    await expect(loginPage.loginError).toBeVisible();
  });

  test('TC5: Register with existing email', async ({ homePage, loginPage }) => {
    await homePage.open();
    await homePage.navSignupLogin.click();

    await loginPage.startSignup('Duplicate User', REGISTERED_USER.email);
    await expect(loginPage.signupError).toBeVisible();
  });
});