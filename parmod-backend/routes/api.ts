import express from 'express';
const router = express.Router();

import usersRouter from './users';
import loginRouter from './login';
import designRouter from './designs';

router.use('/users/', usersRouter);
router.use('/login/', loginRouter);
router.use('/designs/', designRouter);

export default router;
