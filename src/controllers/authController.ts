import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';

const authService = new AuthService();

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ status: 'success', data: result });
  } catch (error: any) {
    if (error.message === 'MISSING_FIELDS') {
      res.status(400).json({ error: 'Username, password, and password_confirmation are required.' });
      return;
    }
    if (error.message === 'PASSWORD_NOT_MATCH') {
      res.status(400).json({ error: 'Password and password_confirmation do not match.' });
      return;
    }
    if (error.message === 'USERNAME_ALREADY_EXISTS') {
      res.status(400).json({ error: 'Username is already taken.' });
      return;
    }
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const tokens = await authService.login(req.body);
    res.json({ status: 'success', ...tokens });
  } catch (error: any) {
    if (error.message === 'MISSING_FIELDS') {
      res.status(400).json({ error: 'Username and password are required.' });
      return;
    }
    if (error.message === 'INVALID_CREDENTIALS') {
      res.status(401).json({ error: 'Invalid username or password.' });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};