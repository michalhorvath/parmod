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
  email: string,
  profilePhoto?: mongoose.Types.ObjectId,
  registeredDate: Date
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

export interface Like {
  _id?: mongoose.Types.ObjectId,
  user: mongoose.Types.ObjectId,
  likedDate: Date
}

export type NewLike = Omit<Like, '_id'>;

export interface Comment {
  _id?: mongoose.Types.ObjectId,
  user: mongoose.Types.ObjectId,
  text: string,
  commentedDate: Date
}

export type NewComment = Omit<Comment, '_id'>;

export interface Design {
  _id: mongoose.Types.ObjectId,
  title: string,
  description: string,
  code: string,
  author: mongoose.Types.ObjectId,
  parameters: Parameter[]
  likes: Like[],
  comments: Comment[],
  publishedDate: Date
}

export interface NewDesign extends Omit<Design, '_id' | 'parameters'> {
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
  parameterValues: ParameterValue[],
  modelFile: mongoose.Types.ObjectId,
  generatedDate: Date
}

export interface NewModel extends Omit<Model, 'id' | 'parameterValues'> {
  parameterValues: NewParameterValue[];
}

export interface Image{
  _id: mongoose.Types.ObjectId,
  data: mongoose.Types.Buffer,
  contentType: string
}

export type NewImage = Omit<Image, '_id'>;

export enum ModelFileStatus {
  RENDERING = 'rendering',
  OK = 'ok',
  FAILED = 'failed'
}

export interface ModelFile{
  _id: mongoose.Types.ObjectId,
  status: ModelFileStatus,
  data: mongoose.Types.Buffer,
  contentType: 'model/stl'
}
