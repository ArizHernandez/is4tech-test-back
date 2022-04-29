import { Router } from 'express';

import isAuth from '../helpers/isAuth';

import authRouter from './auth';
import authorizatedChRouter from './authorizatedChannel';
import distributorsRouter from './distributor';
import productsRouter from './product';

const router = Router();

router.use('/auth', authRouter);
router.use('/authorizated-channels', isAuth, authorizatedChRouter);
router.use('/products', isAuth, productsRouter);
router.use('/distributors', isAuth, distributorsRouter);

export default router;
