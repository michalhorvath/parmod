import express from 'express';
const router = express.Router();

import usersRouter from './users';
import loginRouter from './login';
import designRouter from './designs';
import modelRouter from './models';

router.use('/users/', usersRouter);
router.use('/login/', loginRouter);
router.use('/designs/', designRouter);
router.use('/models/', modelRouter);

export default router;
