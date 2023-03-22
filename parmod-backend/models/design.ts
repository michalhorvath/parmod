import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { Design, Parameter } from '../types';

const parameterSchema = new mongoose.Schema<Parameter>(
  {
    name: {
      type: String,
      minLength: 3,
      unique: true
    },
    variable: {
      type: String,
      minLength: 3,
      required: true
    },
    type: {
      type: String,
      minLength: 3,
      required: true
    },
    defaultValue: {
      type: String,
      minLength: 3,
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

const designSchema = new mongoose.Schema<Design>({
  title: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true
  },
  description: {
    type: String, 
    minLength: 3,
    required: true 
  },
  code: { 
    type: String, 
    minLength: 3,
    required: true 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  parameters: [
    parameterSchema
  ]
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

parameterSchema.plugin(uniqueValidator);

export default mongoose.model('Design', designSchema);

