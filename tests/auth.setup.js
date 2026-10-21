const { test, expect } = require('@playwright/test');
const path = require('path');

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

const TEST_USER = {
  email: 'helgats@gmail.com',
  password: 'Test123',
};

test('authenticate', async ({ page, request }) => {
  // --- login ---
  await page.goto('/login');
  await page.locator('[data-qa="login-email"]').fill(TEST_USER.email);
  await page.locator('[data-qa="login-password"]').fill(TEST_USER.password);
  await page.locator('[data-qa="login-button"]').click();

  // Ждём одно из двух: успех или ошибку логина.
  // automationexercise.com медленный — даём 20 секунд вместо дефолтных 10.
  const success = page.locator('a:has-text("Logged in as")');
  const failure = page.getByText('Your email or password is incorrect!');

  await Promise.race([
    success.waitFor({ state: 'visible', timeout: 20_000 }),
    failure.waitFor({ state: 'visible', timeout: 20_000 }),
  ]);

  // --- Если логин не удался — аккаунта нет, создаём через API ---
  if (await failure.isVisible()) {
    await request.post('/api/createAccount', {
      form: {
        name: 'Storage Test',
        email: TEST_USER.email,
        password: TEST_USER.password,
        title: 'Mr',
        birth_date: '15',
        birth_month: '6',
        birth_year: '1995',
        firstname: 'Storage',
        lastname: 'Test',
        company: '',
        address1: 'Test St 1',
        address2: '',
        country: 'United States',
        zipcode: '90001',
        state: 'California',
        city: 'Los Angeles',
        mobile_number: '1234567890',
      },
    });

    // Логинимся повторно уже с существующим аккаунтом
    await page.locator('[data-qa="login-email"]').fill(TEST_USER.email);
    await page.locator('[data-qa="login-password"]').fill(TEST_USER.password);
    await page.locator('[data-qa="login-button"]').click();
  }

  // --- Финальная проверка и сохранение состояния ---
  await expect(page.locator('a:has-text("Logged in as")')).toBeVisible({ timeout: 20_000 });
  await page.context().storageState({ path: authFile });
});