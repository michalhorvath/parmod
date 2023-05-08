import express from 'express';
const router = express.Router();

import ModelModel from '../models/model';
import DesignModel from '../models/design';
import ModelFileModel from '../models/modelFile';
import FeedModel from '../models/feed';
import { toNewModel } from '../utils/validators';
import authorizator from '../middleware/authorizator';
import { AuthRequest, Design, FeedType, UserRole } from '../types';
import openscad from '../utils/openscad';

router.get('/', async (req, res) => {
  if (req.query.user && req.query.design){
    const models = await ModelModel.find({
      user: req.query.user,
      design: req.query.design
    })
      .populate('modelFile');
    return res.json(models);
  }
  const models = await ModelModel.find({})
    .populate('modelFile');
  return res.json(models);
});

router.post('/', authorizator, async (req: AuthRequest, res) => {
  if (!req.user){
    return res.status(401).end();
  }
  const savedModelFile = await ModelFileModel.create({});
  const newModel = toNewModel(req.body, req.user, savedModelFile);
  const savedModel = await ModelModel.create(newModel);
  const design = await DesignModel.findById(savedModel.design) as Design;
  if (!design){
    throw new Error('design not found');
  }
  void openscad.render(savedModelFile,savedModel, design);
  await FeedModel.create({
    user: savedModel.user,
    design: design._id,
    date: new Date(),
    type: FeedType.MODEL
  });
  return res.status(201).json(savedModel);
});

router.delete('/:id', authorizator, async (req: AuthRequest, res) => {
  const modelToDelete = await ModelModel.findById(req.params.id);
  if (!req.user || !modelToDelete 
    || (req.user.id.toString() !== modelToDelete.user.toString()
    && req.user.role !== UserRole.MODERATOR 
    && req.user.role !== UserRole.ADMIN)){
    return res.status(401).json({error: 'no permission to remove model'});
  }

  await modelToDelete.delete();

  return res.status(204).end();
});

router.get('/:id', async (req, res) => {
  const model = await ModelModel.findById(req.params.id)
    .populate('design')
    .populate('user')
    .populate('modelFile');
  if (!model) {
    return res.status(400).end();
  }
  return res.json(model);
});

export default router;
