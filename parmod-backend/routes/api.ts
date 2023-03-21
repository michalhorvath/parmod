import express from 'express';
const router = express.Router();

import usersRouter from './users';
import loginRouter from './login';

router.use('/users/', usersRouter);
router.use('/login/', loginRouter);

export default router;
