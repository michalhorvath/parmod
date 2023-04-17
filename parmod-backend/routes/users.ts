import express from 'express';
const router = express.Router();

import UserModel from '../models/user';
import { toNewUser } from '../utils/validators';
import passwordHasher from '../middleware/passwordHasher';

router.get('/', async (req, res) => {
  const users = await UserModel.find({});
  res.json(users);
});

router.post('/register', passwordHasher, async (req, res) => {
  const newUser = toNewUser(req.body);
  const savedUser = await UserModel.create(newUser);
  res.status(201).json(savedUser);
});

router.get('/:id', async (req, res) => {
  const user = await UserModel
    .findById(req.params.id)
    .populate('profilePhoto');
  if (!user) {
    return res.status(400).end();
  }
  return res.json(user);
});

export default router;
