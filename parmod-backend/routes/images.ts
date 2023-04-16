import express from 'express';
const router = express.Router();

import multer from 'multer';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage });

import ImageModel from '../models/image';
import { toNewImage } from '../utils/validators';

router.post('/', upload.single('myImage'), async (req, res) => {
  if (!req.file){
    throw new Error('no file');
  }
  const newImage = toNewImage(req.body, req.file.filename);
  const image = await ImageModel.create(newImage);
  res.status(201).json({message: 'ok'});
});

router.get('/:id', async (req, res) => {
  const image = await ImageModel.findById(req.params.id);
  if (!image) {
    return res.status(400).end();
  }
  return res.render('images',{items: image.data});
});

export default router;
