import mongoose from 'mongoose';
import { Request } from 'express';

export enum UserRole {
  USER = 'user',
  DESIGNER = 'designer',
  MODERATOR = 'moderator',
  ADMIN = 'admin'
}

export interface User {
  id: mongoose.Types.ObjectId,
  username: string,
  passwordHash: string,
  role: UserRole,
  name: string,
  email: string
}

export type NewUser = Omit<User, 'id'>;

export interface AuthRequest extends Request {
  user?: User | null;
  token?: string | null;
}
