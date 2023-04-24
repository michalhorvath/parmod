import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { User, UserRole } from '../types';

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    minLength: 3,
    unique: true
  },
  name: {
    type: String, 
    minLength: 3,
    required: true 
  },
  email: { 
    type: String, 
    minLength: 3,
    unique: true 
  },
  passwordHash: { 
    type: String, 
    required: true
  },
  role: { 
    type: String, 
    required: true,
    enum: UserRole,
    default:  UserRole.USER
  },
  profilePhoto: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Image'
  },
  registeredDate: {
    type: Date,
    required: true
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ret.id = ret._id;
      //delete ret._id;
      delete ret.__v;
      delete ret.passwordHash;
    }
  }
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);

