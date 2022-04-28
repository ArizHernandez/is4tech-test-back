/* eslint-disable no-console */
import express from 'express';

import { config } from 'dotenv';
import cors from 'cors';
import logger from 'morgan';

config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 8080;
const app = express();

app.use(logger(NODE_ENV === 'development' ? 'dev' : 'common'));
app.use(cors());
app.use(express.json());

export const server = app.listen(port, () => {
  console.log(`server listening in port ${port}`)
});

export default app;
