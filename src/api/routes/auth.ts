import { Router } from 'express';

import Joi from 'joi';

import * as controller from '../controllers/auth';
import validateHandler from '../helpers/validator';

const validateObj = Joi.object().keys({
  user: Joi.string().required(),
  password: Joi.string().required(),
});

const router = Router();

router.post('/login', validateHandler(validateObj, 'body'), controller.login);
router.post(
  '/sign-up',
  validateHandler(validateObj, 'body'),
  controller.signup
);

export default router;
