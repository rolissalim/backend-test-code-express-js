import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: number; username: string };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Authorization token is required.' });
    return;
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'supersecretkey';
    const decoded = jwt.verify(token, jwtSecret) as { id: number; username: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};
