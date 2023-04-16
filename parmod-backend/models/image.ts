import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { Image } from '../types';

const imageSchema = new mongoose.Schema<Image>({
  name: {
    type: String,
    unique: true
  },
  data: Buffer, 
  contentType: String
}, {
  toJSON: {
    transform: (doc, ret) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.passwordHash;
    }
  }
});

imageSchema.plugin(uniqueValidator);

export default mongoose.model('Image', imageSchema);

