import express from 'express';
const router = express.Router();

import DesignModel from '../models/design';
import FeedModel from '../models/feed';
import UserModel from '../models/user';
import { toNewDesign, toUpdateDesign, 
  toNewComment, toNewLike } from '../utils/validators';
import authorizator from '../middleware/authorizator';
import { AuthRequest, UserRole, FeedType } from '../types';
import Mailer from '../utils/mailer';

router.get('/', async (req, res) => {
  const designs = await DesignModel
    .find({}, { id: 1, title: 1, photo: 1, publishedDate: 1, 
      likes: 1, comments: 1 }).
    populate('photo');
  res.json(designs);
});

router.post('/', authorizator, async (req: AuthRequest, res) => {
  if (!req.user){
    return res.status(401).end();
  }
  const newDesign = toNewDesign(req.body, req.user);
  const savedDesign = await DesignModel.create(newDesign);
  await FeedModel.create({
    user: savedDesign.author,
    design: savedDesign._id,
    date: new Date(),
    type: FeedType.DESIGN
  });
  const mailto: string[] =
    (await UserModel.find({following: req.user.id}))
      .map(u => u.email);
  Mailer.send(
    mailto, 
    `${req.user.username} just uploaded new design ${savedDesign.title}`, 
    'visit the website to see more');
  return res.status(201).json(savedDesign);
});

router.delete('/:id', authorizator, async (req: AuthRequest, res) => {
  const designToDelete = await DesignModel.findById(req.params.id);
  if (!req.user || !designToDelete 
    || (req.user.id.toString() !== designToDelete.author.toString()
    && req.user.role !== UserRole.MODERATOR 
    && req.user.role !== UserRole.ADMIN)){
    return res.status(401).json({error: 'no permission to remove design'});
  }

  await designToDelete.delete();

  return res.status(204).end();
});

router.put('/:id', authorizator, async (req: AuthRequest, res) => {
  const design = await DesignModel.findById(req.params.id);
  if (!req.user || !design || req.user.id.toString() !== design.author.toString()){
    return res.status(401).end();
  }
  const updateDesign = toUpdateDesign(req.body);
  const savedDesign = await DesignModel.findByIdAndUpdate(
    req.params.id, 
    updateDesign, 
    { new: true, runValudators: true });
  return res.status(201).json(savedDesign);
});

router.get('/:id', async (req, res) => {
  const design = await DesignModel.findById(req.params.id)
    .populate('author')
    .populate('photo')
    .populate({
      path: 'comments.user',
      select: {id:1, username:1}
    })
    .populate({
      path: 'likes.user',
      select: {id:1, username:1}
    })
    .exec();
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
  const savedComment = updatedDesign.comments[updatedDesign.comments.length - 1];
  await FeedModel.create({
    user: req.user,
    design: updatedDesign._id,
    ref: savedComment._id,
    date: new Date(),
    type: FeedType.COMMENT
  });
  return res.json(savedComment);
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

    await FeedModel
      .find({ref: req.params.commentId})
      .remove();

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
  const savedLike = updatedDesign.likes[updatedDesign.likes.length - 1];

  await FeedModel.create({
    user: req.user,
    design: updatedDesign._id,
    ref: savedLike._id,
    date: new Date(),
    type: FeedType.LIKE
  });
  
  return res.json(savedLike);
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

  await FeedModel
    .find({ref: req.params.likeId})
    .remove();

  return res.json(updatedDesign);
});

export default router;
