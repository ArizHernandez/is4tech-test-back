import request from 'supertest';

import * as authDal from '../src/db/dal/authorizatedChannel';
import app, { server } from '../src';

const baseUrl = '/api/authorizated-channels';
let createdUrl = `${baseUrl}/0`;

const postObj = {
  distributor_id: 0,
  code: 'a-1',
  name: 'Channel 1',
};

const postObjWrongId = {
  distributor_id: 1500,
  code: 'a-1',
  name: 'Channel 1',
};

const postObjtWrong = {
  code: 'a-1',
  name: 'Channel 1',
};

const authResolved = {
  distributor_id: 0,
  code: 'a-1',
  name: 'Channel 1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('[AuthorizatedChannels] Testing endpoints /api/authorizated-channels', () => {
  beforeEach(() => {
    // mocking functions
    (authDal.getById as Function) = () => Promise.resolve(authResolved);
    (authDal.getAll as Function) = () => Promise.resolve([authResolved]);
    (authDal.create as Function) = () => Promise.resolve(authResolved);
    (authDal.update as Function) = () => Promise.resolve(authResolved);
    (authDal.deletById as Function) = () => Promise.resolve(true);
  });

  test('Should create an authorizatedChannel an return status 201', async () => {
    const { body, statusCode } = await request(app).post(baseUrl).send(postObj);

    expect(statusCode).toBe(201);
    expect(body).toBeTruthy();
  });

  test("Should don't find a valid distributor and return 404", async () => {
    (authDal.create as Function) = () =>
      Promise.reject({ statusCode: 404, message: 'NOT-FOUND' });

    const { statusCode } = await request(app)
      .post(baseUrl)
      .send(postObjWrongId);

    expect(statusCode).toBe(404);
  });

  test('Should return 400 for invalid payload in post', async () => {
    const { statusCode } = await request(app).post(baseUrl).send(postObjtWrong);

    expect(statusCode).toBe(400);
  });

  test('Should return 400 for invalid payload in update', async () => {
    const { statusCode } = await request(app)
      .put(createdUrl)
      .send(postObjtWrong);

    expect(statusCode).toBe(400);
  });

  test('Should update authorizatedChannel and return 200', async () => {
    const { body, statusCode } = await request(app)
      .put(createdUrl)
      .send(postObj);

    expect(statusCode).toBe(200);
    expect(body).toBeTruthy();
  });

  test('Should delete authorizatedChannel and return 200', async () => {
    const { statusCode } = await request(app).delete(createdUrl);

    expect(statusCode).toBe(200);
  });

  afterAll(() => {
    server.close();
  });
});
