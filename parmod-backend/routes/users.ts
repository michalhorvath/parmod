import express from 'express';
const router = express.Router();

import UserModel from '../models/user';
import { toNewUser, toUpdateUser, toChangedRoleAdmin } from '../utils/validators';
import passwordHasher from '../middleware/passwordHasher';
import authorizator from '../middleware/authorizator';
import { AuthRequest, UserRole } from '../types';

router.get('/', async (req, res) => {
  const users = await UserModel.find({});
  res.json(users);
});

router.post('/register', passwordHasher, async (req, res) => {
  const newUser = toNewUser(req.body);
  const savedUser = await UserModel.create(newUser);
  res.status(201).json(savedUser);
});

router.delete('/:id', authorizator, async (req: AuthRequest, res) => {
  const userToDelete = await UserModel.findById(req.params.id);
  if (!req.user || !userToDelete 
    || (req.user.id.toString() !== userToDelete._id.toString()
    && req.user.role !== UserRole.MODERATOR 
    && req.user.role !== UserRole.ADMIN)){
    return res.status(401).json({error: 'no permission to remove user'});
  }

  await userToDelete.delete();

  return res.status(204).end();
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

router.post('/:id/follow', authorizator, passwordHasher, 
  async (req: AuthRequest, res) => {
    const userToFollow = await UserModel.findById(req.params.id);
    if (!userToFollow || !req.user) {
      return res.status(400).end();
    }
    if (req.user.following.find(u => (u.toString() === userToFollow._id.toString()))){
      return res.status(400).json({error: 'user is already following the user'});
    }

    const following = req.user.following;
    following.push(userToFollow._id);
    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      {following}, 
      { new: true, runValudators: true });

    return res.status(201).json(user);
  });

router.post('/:id/unfollow', authorizator, passwordHasher, 
  async (req: AuthRequest, res) => {
    const userToUnfollow = await UserModel.findById(req.params.id);
    if (!userToUnfollow || !req.user) {
      return res.status(400).end();
    }
    if (!req.user.following.find(u => (u.toString() === userToUnfollow._id.toString()))){
      return res.status(400).json({error: 'user is not following the user'});
    }

    const following = req.user.following
      .filter(u => u._id.toString() !== userToUnfollow._id.toString());
    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      {following}, 
      { new: true, runValudators: true });

    return res.status(201).json(user);
  });


router.post('/:id/setrole', authorizator, passwordHasher, 
  async (req: AuthRequest, res) => {
    const userToChange = await UserModel.findById(req.params.id);
    if (!userToChange || !req.user) {
      return res.status(400).end();
    }
    if (req.user.role !== UserRole.MODERATOR && req.user.role !== UserRole.ADMIN){
      return res.status(401).end();
    }

    const newRole = toChangedRoleAdmin(req.body);

    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      {role: newRole}, 
      { new: true, runValudators: true })
      .populate('profilePhoto');

    return res.status(201).json(user);
  });

export default router;
