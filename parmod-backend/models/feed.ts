import mongoose from 'mongoose';

import { Feed, FeedType } from '../types';

const feedSchema = new mongoose.Schema<Feed>({
  design: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Design'
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  ref: { 
    type: mongoose.Schema.Types.ObjectId
  },
  type: { 
    type: String, 
    required: true,
    enum: FeedType
  },
  date: {
    type: Date,
    required: true
  }
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

export default mongoose.model('Feed', feedSchema);

