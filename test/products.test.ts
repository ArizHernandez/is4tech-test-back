import request from 'supertest';

import * as productDal from '../src/db/dal/product';
import app, { server } from '../src';

const baseUrl = '/api/products';
let createdUrl = `${baseUrl}/0`;

const postObj = {
  distributor_id: 0,
  code: 'RTX-380-01',
  description: 'test',
  amount: 8000.0,
};

const postObjWrongId = {
  distributor_id: 1500,
  code: 'RTX-380-01',
  description: 'test',
  amount: 8000.0,
};

const postObjWrong = {
  code: 'RTX-380-01',
  description: 'test',
  amount: 8000.0,
};

const productResolver = {
  distributor_id: 0,
  code: 'RTX-380-01',
  description: 'test',
  amount: 8000.0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('[Product] Testing endpoints /api/products', () => {
  beforeEach(() => {
    // mocking functions
    (productDal.getById as Function) = () => Promise.resolve(productResolver);
    (productDal.getAll as Function) = () => Promise.resolve([productResolver]);
    (productDal.create as Function) = () => Promise.resolve(productResolver);
    (productDal.update as Function) = () => Promise.resolve(productResolver);
    (productDal.deletById as Function) = () => Promise.resolve(true);
  });

  test('Should create a product an return status 201', async () => {
    const { body, statusCode } = await request(app).post(baseUrl).send(postObj);

    expect(statusCode).toBe(201);
    expect(body).toBeTruthy();
  });

  test("Should don't find a valid distributor and return 404", async () => {
    (productDal.create as Function) = () =>
      Promise.reject({ statusCode: 404, message: 'NOT-FIND' });

    const { statusCode } = await request(app)
      .post(baseUrl)
      .send(postObjWrongId);

    expect(statusCode).toBe(404);
  });

  test('Should return 400 for invalid payload in post', async () => {
    const { statusCode } = await request(app).post(baseUrl).send(postObjWrong);

    expect(statusCode).toBe(400);
  });

  test('Should return 400 for invalid payload in update', async () => {
    const { statusCode } = await request(app)
      .put(createdUrl)
      .send(postObjWrong);

    expect(statusCode).toBe(400);
  });

  test('Should update product and return 200', async () => {
    const { body, statusCode } = await request(app)
      .put(createdUrl)
      .send(postObj);

    expect(statusCode).toBe(200);
    expect(body).toBeTruthy();
  });

  test('Should delete product and return 200', async () => {
    const { body, statusCode } = await request(app).delete(createdUrl);

    expect(statusCode).toBe(200);
  });

  afterAll(() => {
    server.close();
  });
});
