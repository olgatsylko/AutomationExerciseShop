const { test, expect } = require('../../fixtures/api.fixture');

test.describe('Products API', () => {
  test('API1: GET All Products List — 200', async ({ api }) => {
    const resp = await api.get('/api/productsList');
    expect(resp.status()).toBe(200);

    const body = await resp.json();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('API2: POST To All Products List — 405', async ({ api }) => {
    const resp = await api.post('/api/productsList');
    expect(resp.status()).toBe(405);

    const body = await resp.json();
    expect(body.message).toBe('This request method is not supported.');
  });

  test('API3: GET All Brands List — 200', async ({ api }) => {
    const resp = await api.get('/api/brandsList');
    expect(resp.status()).toBe(200);

    const body = await resp.json();
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.brands)).toBe(true);
  });

  test('API4: PUT To All Brands List — 405', async ({ api }) => {
    const resp = await api.put('/api/brandsList');
    expect(resp.status()).toBe(405);
  });

  test('API5: POST Search Product — 200', async ({ api }) => {
    const resp = await api.post('/api/searchProduct', {
      form: { search_product: 'top' },
    });
    expect(resp.status()).toBe(200);

    const body = await resp.json();
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('API6: POST Search Product without parameter — 400', async ({ api }) => {
    const resp = await api.post('/api/searchProduct', {
      form: {},
    });
    expect(resp.status()).toBe(400);

    const body = await resp.json();
    expect(body.message).toBe('Bad request, search_product parameter is missing in POST request.');
  });
});