import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

const passwordHasher = async (req: Request, res: Response, 
  next: NextFunction) => {
  if (req.body.password && typeof req.body.password === 'string') {
    const password = req.body.password as string;
    req.body.passwordHash = await bcrypt.hash(password, 10);
    delete req.body.password;
  }
  next();
};

export default passwordHasher;
