import mongoose from 'mongoose';

import { ModelFile, ModelFileStatus } from '../types';

const modelFileSchema = new mongoose.Schema<ModelFile>({
  status: { 
    type: String, 
    required: true,
    enum: ModelFileStatus,
    default:  ModelFileStatus.RENDERING
  },
  data: {
    type: Buffer,
    required: false
  }, 
  contentType: {
    type: String,
    default: 'model/stl',
    required: true
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

export default mongoose.model('ModelFile', modelFileSchema);

