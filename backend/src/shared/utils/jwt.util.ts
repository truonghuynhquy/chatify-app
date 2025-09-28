import { Response } from 'express';
import * as jwt from 'jsonwebtoken';

export function generateToken(userId: string, res: Response): string {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });

  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });

  return token;
}
