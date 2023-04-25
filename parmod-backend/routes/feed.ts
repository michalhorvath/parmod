import express from 'express';
const router = express.Router();

import FeedModel from '../models/feed';

router.get('/', async (req, res) => {
  if (req.query.user && req.query.type){
    const feed = await FeedModel.find({
      user: req.query.user,
      type: req.query.type
    })
      .populate({
        path: 'design',
        populate: {
          path: 'photo'
        }
      });
    res.json(feed);
  }
  const feed = await FeedModel.find({})
    .sort({date: -1})
    .limit(50)
    .populate({
      path: 'user',
      select: {id:1, username:1}
    })
    .populate({
      path: 'design',
      select: {id:1, title:1}
    });
  res.json(feed);
});


export default router;
