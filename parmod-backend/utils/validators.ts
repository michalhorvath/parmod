import { NewUser, UserRole, NewDesign, NewParameter, User } from '../types';

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

const isUserRole = (s: string): s is UserRole => {
  return Object.values(UserRole).map(v => v.toString()).includes(s);
};

const parseUserRole = (s: unknown): UserRole => {
  if (!s || !isString(s) || !isUserRole(s)) {
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
    parameters: parseParameters(object.parameters)
  };
};
