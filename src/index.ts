/* eslint-disable no-console */
import express from 'express';

import { config } from 'dotenv';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';

import dbInit from './db/init';
import docs from './api/docs';
import errorHandler from './api/helpers/errorHandler';
import routes from './api/routes';

config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 8080;
const app = express();

app.use(logger(NODE_ENV === 'development' ? 'dev' : 'common'));
app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.use('/docs', docs);

if (NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'pages')));
  app.use('**', express.static(path.resolve(__dirname, '..', 'pages')));
}

app.use(errorHandler);

if (NODE_ENV !== 'test') {
  dbInit();
}

export const server = app.listen(port);

export default app;
