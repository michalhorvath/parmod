import { NewUser, UserRole, NewDesign, NewParameter, 
  User, NewModel, NewParameterValue, NewComment, NewLike } from '../types';
import mongoose from 'mongoose';

const error = new Error('Incorrect or missing data');
error.name = 'ValidationError';

const isString = (s: unknown): s is string => {
  return typeof s === 'string';
};

const parseString = (s: unknown): string => {
  if (!s || !isString(s)) {
    throw error;
  }
  return s;
};

const isObjectId = (s: unknown): s is mongoose.Types.ObjectId => {
  return mongoose.isValidObjectId(s);
};

const parseObjectId = (s: unknown): mongoose.Types.ObjectId => {
  if (!s || !isObjectId(s)) {
    throw error;
  }
  return s;
};

const isUserRole = (s: string): s is UserRole => {
  return Object.values(UserRole).map(v => v.toString()).includes(s);
};

const parseUserRole = (s: unknown): UserRole => {
  if (!s || !isString(s) || !isUserRole(s) 
    || s === UserRole.ADMIN || s === UserRole.MODERATOR) {
    throw error;
  }
  return s;
};

export const toNewUser = (object: unknown): NewUser => {
  if (!object || typeof object !== 'object'){
    throw error;
  }
  if (
    !('username' in object) ||
    !('passwordHash' in object) ||
    !('role' in object) ||
    !('name' in object) ||
    !('email' in object)
  ){
    throw error;
  }
  const newUser: NewUser = {
    username: parseString(object.username),
    passwordHash: parseString(object.passwordHash),
    role: parseUserRole(object.role),
    name: parseString(object.name),
    email: parseString(object.email)
  };
  return newUser;
};

const parseParameter = (object: unknown): NewParameter => {
  if (!object || typeof object !== 'object'){
    throw error;
  }
  if (
    !('name' in object) ||
    !('variable' in object) ||
    !('type' in object) ||
    !('defaultValue' in object)
  ){
    throw error;
  }
  return {
    name: parseString(object.name),
    variable: parseString(object.variable),
    type: parseString(object.type),
    defaultValue: parseString(object.defaultValue)
  };
};

const parseParameters = (object: unknown): NewParameter[] => {
  if (!object || !Array.isArray(object)){
    throw error;
  }
  return object.map(o => parseParameter(o));
};

export const toNewDesign = (object: unknown, user: User): NewDesign => {
  if (!object || typeof object !== 'object'){
    throw error;
  }
  if (
    !('title' in object) ||
    !('description' in object) ||
    !('code' in object) ||
    !('parameters' in object)
  ){
    throw error;
  }
  return {
    title: parseString(object.title),
    description: parseString(object.description),
    code: parseString(object.code),
    author: user.id,
    parameters: parseParameters(object.parameters),
    comments: [],
    likes: []
  };
};

const parseParameterValue = (object: unknown): NewParameterValue => {
  if (!object || typeof object !== 'object'){
    throw error;
  }
  if (
    !('name' in object) ||
    !('value' in object)
  ){
    throw error;
  }
  return {
    name: parseString(object.name),
    value: parseString(object.value)
  };
};

const parseParameterValues = (object: unknown): NewParameterValue[] => {
  if (!object || !Array.isArray(object)){
    throw error;
  }
  return object.map(o => parseParameterValue(o));
};

export const toNewModel = (object: unknown, user: User): NewModel => {
  if (!object || typeof object !== 'object'){
    throw error;
  }
  if (
    !('design' in object) ||
    !('parameterValues' in object)
  ){
    throw error;
  }
  return {
    design: parseObjectId(object.design),
    user: user.id,
    parameterValues: parseParameterValues(object.parameterValues)
  };
};

export const toNewComment = (object: unknown, user: User): NewComment => {
  if (!object || typeof object !== 'object'){
    throw error;
  }
  if (
    !('text' in object)
  ){
    throw error;
  }
  return {
    text: parseString(object.text),
    user: user.id
  };
};

export const toNewLike = (object: unknown, user: User): NewLike => {
  if (!object || typeof object !== 'object'){
    throw error;
  }
  return {
    user: user.id
  };
};
