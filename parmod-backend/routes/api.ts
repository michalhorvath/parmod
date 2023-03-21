import express from 'express';
const router = express.Router();

import usersRouter from './users';

router.use('/users/', usersRouter);

export default router;
