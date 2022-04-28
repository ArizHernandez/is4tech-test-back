import { NextFunction, Request, Response } from 'express';

import { AnySchema } from 'joi';

const validate = (
  validateObj: AnySchema,
  property: 'body' | 'query' | 'params'
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validateObj.validate(req[property]);

    if (error) {
      res.status(400).json({
        message: 'BAD-REQUEST',
        error: error.details,
      });
    }

    next();
  };
};

export default validate;
