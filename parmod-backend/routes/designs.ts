import express from 'express';
const router = express.Router();

import DesignModel from '../models/design';
import { toNewDesign, toNewComment, toNewLike } from '../utils/validators';
import authorizator from '../middleware/authorizator';
import { AuthRequest, UserRole } from '../types';

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
  return res.json(updatedDesign.comments[updatedDesign.comments.length - 1]);
});

router.delete('/:id/comments/:commentId', 
  authorizator, async (req: AuthRequest, res) => {
    const design = await DesignModel.findById(req.params.id);
    if (!design || !req.user) {
      return res.status(400).end();
    }

    const comment = design.comments.find(
      c => c._id && c._id.equals(req.params.commentId)
    );

    if (!comment){
      return res.status(400).json({error: 'comment does not exist'});
    }

    if ( comment.user.toString() !== req.user.id.toString()
      && (req.user.role === UserRole.DESIGNER || req.user.role === UserRole.USER)){
      return res.status(401).json({ error: 'no permission to remove the comment' });
    }

    design.comments = design.comments.filter(
      c => c._id && !c._id.equals(req.params.commentId)
    );

    const updatedDesign = await design.save();
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
  const userId = req.user.id;
  if (design.likes.find(l => (l.user.toString() === userId.toString()))){
    return res.status(400).json({error: 'user already liked the design'});
  }
  const newLike = toNewLike(req.body, req.user);
  design.likes = design.likes.concat(newLike);
  const updatedDesign = await DesignModel.findByIdAndUpdate(
    req.params.id, design, { new: true, runValudators: true });
  if (!updatedDesign) {
    return res.status(400).end();
  }
  return res.json(updatedDesign.likes[updatedDesign.likes.length - 1]);
});

router.delete('/:id/likes/:likeId', authorizator, async (req: AuthRequest, res) => {
  const design = await DesignModel.findById(req.params.id);
  if (!design || !req.user) {
    return res.status(400).end();
  }

  const like = design.likes.find(
    l => l._id && l._id.equals(req.params.likeId)
  );

  if (!like){
    return res.status(400).json({error: 'like does not exist'});
  }

  if ( like.user.toString() !== req.user.id.toString()){
    return res.status(401).json({ error: 'no permission to remove the like' });
  }

  design.likes = design.likes.filter(
    l => l._id && !l._id.equals(req.params.likeId)
  );

  const updatedDesign = await design.save();

  if (!updatedDesign) {
    return res.status(400).end();
  }
  return res.json(updatedDesign);
});

export default router;
