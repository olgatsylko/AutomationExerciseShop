const { test, expect } = require('../../fixtures/api.fixture');

function uniqueEmail() {
  return `qa_${Date.now()}@test.com`;
}

test.describe('Auth API', () => {
  let testEmail;
  const testPassword = 'Password123!';

  test.beforeEach(() => {
    testEmail = uniqueEmail();
  });

  test('API7: POST Verify Login with valid details — 200', async ({ api }) => {
    // Предусловие: создаём пользователя
    await api.post('/api/createAccount', {
      form: {
        name: 'API Test User',
        email: testEmail,
        password: testPassword,
        title: 'Mr',
        birth_date: '15',
        birth_month: '6',
        birth_year: '1995',
        firstname: 'API',
        lastname: 'Test',
        company: 'Test',
        address1: 'Test St 1',
        address2: '',
        country: 'United States',
        zipcode: '90001',
        state: 'California',
        city: 'Los Angeles',
        mobile_number: '1234567890',
      },
    });

    const resp = await api.post('/api/verifyLogin', {
      form: { email: testEmail, password: testPassword },
    });
    expect(resp.status()).toBe(200);

    const body = await resp.json();
    expect(body.message).toBe('User exists!');
  });

  test('API8: POST Verify Login without email — 400', async ({ api }) => {
    const resp = await api.post('/api/verifyLogin', {
      form: { password: 'somepassword' },
    });
    expect(resp.status()).toBe(400);

    const body = await resp.json();
    expect(body.message).toBe('Bad request, email or password parameter is missing in POST request.');
  });

  test('API9: DELETE To Verify Login — 405', async ({ api }) => {
    const resp = await api.delete('/api/verifyLogin');
    expect(resp.status()).toBe(405);
  });

  test('API10: POST Verify Login with invalid details — 404', async ({ api }) => {
    const resp = await api.post('/api/verifyLogin', {
      form: { email: 'nonexistent@test.com', password: 'wrong' },
    });
    expect(resp.status()).toBe(404);

    const body = await resp.json();
    expect(body.message).toBe('User not found!');
  });

  test('API11: POST Create/Register User — 201', async ({ api }) => {
    const resp = await api.post('/api/createAccount', {
      form: {
        name: 'New User',
        email: testEmail,
        password: testPassword,
        title: 'Mrs',
        birth_date: '20',
        birth_month: '3',
        birth_year: '1990',
        firstname: 'New',
        lastname: 'User',
        company: '',
        address1: 'Test Address 1',
        address2: '',
        country: 'Canada',
        zipcode: '10001',
        state: 'Ontario',
        city: 'Toronto',
        mobile_number: '9876543210',
      },
    });
    expect(resp.status()).toBe(201);

    const body = await resp.json();
    expect(body.message).toBe('User created!');
  });

  test('API12: DELETE User Account — 200', async ({ api }) => {
    // Предусловие: создаём пользователя
    await api.post('/api/createAccount', {
      form: {
        name: 'Delete Me',
        email: testEmail,
        password: testPassword,
        title: 'Mr',
        birth_date: '1',
        birth_month: '1',
        birth_year: '2000',
        firstname: 'Delete',
        lastname: 'Me',
        company: '',
        address1: 'Delete St',
        address2: '',
        country: 'United States',
        zipcode: '00000',
        state: 'NY',
        city: 'NYC',
        mobile_number: '1111111111',
      },
    });

    const resp = await api.delete('/api/deleteAccount', {
      form: { email: testEmail, password: testPassword },
    });
    expect(resp.status()).toBe(200);

    const body = await resp.json();
    expect(body.message).toBe('Account deleted!');
  });
});