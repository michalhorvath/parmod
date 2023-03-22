import express from 'express';
const router = express.Router();

import DesignModel from '../models/design';
import { toNewDesign } from '../utils/validators';
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

export default router;
