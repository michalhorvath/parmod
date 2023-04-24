import express from 'express';
const router = express.Router();

import DesignModel from '../models/design';
import ModelModel from '../models/model';

router.get('/', async (req, res) => {
  const designs = await DesignModel
    .find({}, { id: 1, title: 1, author: 1, publishedDate: 1, type: 'design' })
    .populate({
      path: 'author',
      select: {id:1, username:1}
    });
  const models = await ModelModel
    .find({}, {id: 1, design: 1, user: 1, generatedDate: 1, type: 'model'})
    .populate({
      path: 'user',
      select: {id:1, username:1}
    })
    .populate({
      path: 'design',
      select: {id:1, title:1}
    });
  let feed: any[] = [];
  feed = feed.concat(designs);
  feed = feed.concat(models);
  res.json(feed);
});


export default router;
