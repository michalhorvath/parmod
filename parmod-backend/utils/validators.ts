import { NewUser, UserRole } from '../types';

const e = new Error('Incorrect or missing data');
e.name = 'ValidationError';

const isString = (s: unknown): s is string => {
  return typeof s === 'string';
};

const parseString = (s: unknown): string => {
  if (!s || !isString(s)) {
    throw e;
  }
  return s;
};

const isUserRole = (s: string): s is UserRole => {
  return Object.values(UserRole).map(v => v.toString()).includes(s);
};

const parseUserRole = (s: unknown): UserRole => {
  if (!s || !isString(s) || !isUserRole(s)) {
    throw e;
  }
  return s;
};

export const toNewUser = (object: unknown): NewUser => {
  if (!object || typeof object !== 'object'){
    throw e;
  }
  if (
    !('username' in object) ||
    !('passwordHash' in object) ||
    !('role' in object) ||
    !('name' in object) ||
    !('email' in object)
  ){
    throw e;
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

