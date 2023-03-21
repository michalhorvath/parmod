import mongoose from 'mongoose';

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
