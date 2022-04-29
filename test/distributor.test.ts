import request from 'supertest';

import * as distDal from '../src/db/dal/distributor';
import app, { server } from '../src';

const baseUrl = '/api/distributors';
let createdUrl = `${baseUrl}/0`;

const postObj = {
  name: 'Edward',
  code: 'ed-12',
  email_notificate: 'noti@test.com',
  email_alert: 'alert@test.com',
};

const postObjWrong = {
  code: 'ed-12',
  email_notificate: 'noti@test.com',
  email_alert: 'alert@test.com',
};

const distResolver = {
  name: 'Edward',
  code: 'ed-12',
  email_notificate: 'noti@test.com',
  email_alert: 'alert@test.com',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('[Distributor] Testing endpoints /api/distributors', () => {
  beforeEach(() => {
    // mocking functions
    (distDal.getById as Function) = () => Promise.resolve(distResolver);
    (distDal.getAll as Function) = () => Promise.resolve([distResolver]);
    (distDal.create as Function) = () => Promise.resolve(distResolver);
    (distDal.update as Function) = () => Promise.resolve(distResolver);
    (distDal.deletById as Function) = () => Promise.resolve(true);
  });

  test('Should create a distributor an return status 201', async () => {
    const { body, statusCode } = await request(app).post(baseUrl).send(postObj);

    expect(statusCode).toBe(201);
    expect(body).toBeTruthy();
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

  test('Should update distributor and return 200', async () => {
    const { body, statusCode } = await request(app)
      .put(createdUrl)
      .send(postObj);

    expect(statusCode).toBe(200);
    expect(body).toBeTruthy();
  });

  test('Should delete distributor and return 200', async () => {
    const { statusCode } = await request(app).delete(createdUrl);

    expect(statusCode).toBe(200);
  });

  afterAll(() => {
    server.close();
  });
});
