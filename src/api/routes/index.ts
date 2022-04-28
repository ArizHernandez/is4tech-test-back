import { Router } from 'express';

import distributorsRouter from './distributor';
import productsRouter from './product';

const router = Router();

router.use('/distributors', distributorsRouter);
router.use('/products', productsRouter);

export default router;
