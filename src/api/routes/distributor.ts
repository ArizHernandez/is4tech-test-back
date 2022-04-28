import { Router } from 'express';

import Joi from 'joi';

import * as controller from '../controllers/distributor';
import validateHandler from '../helpers/validator';

const validateObj = Joi.object().keys({
  name: Joi.string().required(),
  code: Joi.string().required(),
  email_notificate: Joi.string().email().required(),
  email_alert: Joi.string().email().required(),
});

const router = Router();

router.get('/', controller.get);
router.get('/:id', controller.getById);

router.post('/', validateHandler(validateObj, 'body'), controller.create);

router.put('/:id', validateHandler(validateObj, 'body'), controller.update);

router.delete('/:id', controller.deleteById);

export default router;
