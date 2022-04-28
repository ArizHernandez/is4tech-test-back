import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerDocumment from '../../swagger.json';

const router = Router();

router.use('', swaggerUI.serve);
router.get('', swaggerUI.setup(swaggerDocumment));

export default router;
