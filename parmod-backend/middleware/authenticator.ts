import { Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../models/user';
import { User, UserRole, AuthRequest } from '../types';
import config from '../utils/config';

const authenticator = async (req: AuthRequest, res: Response, 
  next: NextFunction) => {

  if (req.body.username && typeof req.body.username === 'string'
    && req.body.password && typeof req.body.password === 'string') {

    const username: string = req.body.username as string;
    const password: string = req.body.password as string;
    
    const user: User | null = await UserModel.findOne({ username });

    if (user) {
      const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
      if (passwordCorrect){
        req.user = user;
        req.token = jwt.sign(
          { username: user.username, id: user.id }, 
          config.TOKEN_KEY,
          { expiresIn: '1d' }, 
        );
      }
    }

    delete req.body.username;
    delete req.body.password;
  }

  if (!req.user || !req.token) {
    const error = new Error('Invalid username or password.');
    error.name = 'AuthenticationError';
    throw error;
  }

  if (req.user.role === UserRole.BANNED) {
    const error = new Error('User is banned.');
    error.name = 'AuthenticationError';
    throw error;
  }

  next();
};

export default authenticator;
