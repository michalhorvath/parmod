import express from 'express';
const router = express.Router();

import DesignModel from '../models/design';
import ModelModel from '../models/model';

router.get('/', async (req, res) => {
  const designs = await DesignModel.find({}, { id: 1, title: 1, author: 1, type: 'design' });
  const models = await ModelModel.find({}, {id: 1, design: 1, user: 1, type: 'model'});
  let feed: any[] = [];
  feed = feed.concat(designs);
  feed = feed.concat(models);
  res.json(feed);
});


export default router;
