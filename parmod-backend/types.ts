import mongoose from 'mongoose';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: User | null;
  token?: string | null;
}

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

export interface Parameter {
  id: mongoose.Types.ObjectId,
  name: string,
  variable: string,
  type: string,
  defaultValue: string,
}

export type NewParameter = Omit<Parameter, 'id'>;

export interface Design {
  id: mongoose.Types.ObjectId,
  title: string,
  description: string,
  code: string,
  author: mongoose.Types.ObjectId,
  parameters: Parameter[]
}

export interface NewDesign extends Omit<Design, 'id' | 'parameters'> {
  parameters: NewParameter[];
}

export interface ParameterValue {
  id: mongoose.Types.ObjectId,
  name: string,
  value: string,
}

export type NewParameterValue = Omit<ParameterValue, 'id'>;

export interface Model {
  id: mongoose.Types.ObjectId,
  design: mongoose.Types.ObjectId,
  user: mongoose.Types.ObjectId,
  parameterValues: ParameterValue[]
}

export interface NewModel extends Omit<Model, 'id' | 'parameterValues'> {
  parameterValues: NewParameterValue[];
}
