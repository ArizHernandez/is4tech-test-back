import { Router } from 'express';

import Joi from 'joi';

import * as controller from '../controllers/product';
import validateHandler from '../helpers/validator';

const validateObj = Joi.object().keys({
  code: Joi.string().required(),
  description: Joi.string().not().required(),
  amount: Joi.number().required(),
  distributor_id: Joi.number().required(),
});

const router = Router();

router.get('/', controller.get);
router.get('/:id', controller.getById);

router.post('/', validateHandler(validateObj, 'body'), controller.create);

router.put('/:id', validateHandler(validateObj, 'body'), controller.update);

router.delete('/:id', controller.deleteById);

export default router;
