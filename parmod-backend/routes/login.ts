import express from 'express';
const router = express.Router();

import { AuthRequest } from '../types';
import authenticator from '../middleware/authenticator';

router.post('/', authenticator, (req: AuthRequest, res) => {
  res.status(200).send({ 
    token: req.token, 
    user: req.user, 
  });
});

export default router;
