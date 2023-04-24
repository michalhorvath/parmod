import mongoose from 'mongoose';

import { Model, ParameterValue } from '../types';

const parameterValueSchema = new mongoose.Schema<ParameterValue>(
  {
    name: {
      type: String,
      minLength: 1,
      required: true
    },
    value: {
      type: String,
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
  }
);

const modelSchema = new mongoose.Schema<Model>({
  design: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Design'
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  parameterValues: [
    parameterValueSchema
  ],
  modelFile: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'ModelFile'
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

export default mongoose.model('Model', modelSchema);

