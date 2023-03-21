import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../models/user';
import { User, AuthRequest } from '../types';
import config from '../utils/config';

const authorizator = async (req: AuthRequest, res: Response, 
  next: NextFunction) => {

  const authorization = req.get('authorization') as string;
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
    const decodedToken = jwt.verify(req.token, config.TOKEN_KEY);
    if (decodedToken && (typeof decodedToken === 'object') && decodedToken.id ){
      req.user = await UserModel.findById(decodedToken.id);
    }
  }

  if (!req.token || !req.user) {
    const error = new Error('Token missing or invalid.');
    error.name = 'AuthorizationError';
    throw error;
  }

  next();
};

export default authorizator;
