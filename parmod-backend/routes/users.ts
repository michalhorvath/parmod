import express from 'express';
const router = express.Router();

import UserModel from '../models/user';
import { toNewUser, toUpdateUser } from '../utils/validators';
import passwordHasher from '../middleware/passwordHasher';
import authorizator from '../middleware/authorizator';
import { AuthRequest } from '../types';

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

router.put('/:id', authorizator, passwordHasher, 
  async (req: AuthRequest, res) => {
    const updateUser = toUpdateUser(req.body);
    const user = await UserModel.findByIdAndUpdate(
      req.params.id, 
      updateUser, 
      { new: true, runValudators: true });

    res.status(201).json(user);
  });

export default router;
