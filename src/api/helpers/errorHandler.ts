import { ErrorRequestHandler } from 'express';

export interface ErrorHandler extends Error {
  info?: string;
  statusCode?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error, _req, res, _) => {
  const errResp = error;

  if (!errResp.statusCode) {
    errResp.statusCode = 500;
  }

  res.status(errResp.statusCode).json({
    message: errResp.message,
    code: errResp?.statusCode,
  });
};

export default errorHandler;
