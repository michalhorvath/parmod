import express from 'express';
const router = express.Router();

import ModelModel from '../models/model';
import DesignModel from '../models/design';
import ModelFileModel from '../models/modelFile';
import { toNewModel } from '../utils/validators';
import authorizator from '../middleware/authorizator';
import { AuthRequest, Design } from '../types';
import openscad from '../utils/openscad';

router.get('/', async (req, res) => {
  const models = await ModelModel.find({});
  res.json(models);
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
  return res.status(201).json(savedModel);
});

router.get('/:id', async (req, res) => {
  const model = await ModelModel.findById(req.params.id)
    .populate('design')
    .populate('user');
  if (!model) {
    return res.status(400).end();
  }
  return res.json(model);
});

export default router;
