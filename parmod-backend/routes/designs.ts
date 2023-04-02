import express from 'express';
const router = express.Router();

import DesignModel from '../models/design';
import { toNewDesign, toNewComment, toNewLike } from '../utils/validators';
import authorizator from '../middleware/authorizator';
import { AuthRequest } from '../types';

router.get('/', async (req, res) => {
  const designs = await DesignModel.find({}, { id: 1, title: 1 });
  res.json(designs);
});

router.post('/', authorizator, async (req: AuthRequest, res) => {
  if (!req.user){
    return res.status(401).end();
  }
  const newDesign = toNewDesign(req.body, req.user);
  const savedDesign = await DesignModel.create(newDesign);
  return res.status(201).json(savedDesign);
});

router.get('/:id', async (req, res) => {
  const design = await DesignModel.findById(req.params.id).populate('author');
  if (!design) {
    return res.status(400).end();
  }
  return res.json(design);
});

router.post('/:id/comments', authorizator, async (req: AuthRequest, res) => {
  const design = await DesignModel.findById(req.params.id);
  if (!design || !req.user) {
    return res.status(400).end();
  }
  const newComment = toNewComment(req.body, req.user);
  design.comments = design.comments.concat(newComment);
  const updatedDesign = await DesignModel.findByIdAndUpdate(
    req.params.id, design, { new: true, runValudators: true });
  if (!updatedDesign) {
    return res.status(400).end();
  }
  return res.json(updatedDesign);
});

router.post('/:id/likes', authorizator, async (req: AuthRequest, res) => {
  const design = await DesignModel.findById(req.params.id);
  if (!design || !req.user) {
    return res.status(400).end();
  }
  const newLike = toNewLike(req.body, req.user);
  design.likes = design.likes.concat(newLike);
  const updatedDesign = await DesignModel.findByIdAndUpdate(
    req.params.id, design, { new: true, runValudators: true });
  if (!updatedDesign) {
    return res.status(400).end();
  }
  return res.json(updatedDesign);
});

export default router;
