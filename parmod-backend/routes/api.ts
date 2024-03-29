import express from 'express';
const router = express.Router();

import usersRouter from './users';
import loginRouter from './login';
import designRouter from './designs';
import modelRouter from './models';
import feedRouter from './feed';
import imageRouter from './images';

router.use('/users/', usersRouter);
router.use('/login/', loginRouter);
router.use('/designs/', designRouter);
router.use('/models/', modelRouter);
router.use('/feed/', feedRouter);
router.use('/images/', imageRouter);

export default router;
