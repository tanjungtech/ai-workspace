import type { Request, Response } from 'express';
import { login } from '../services/auth.service.js';

export async function loginUser(
  req: Request,
  res: Response
) {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.status(200).json(result);
  } catch {
    res.status(401).json({
      message: 'Invalid credentials',
    });
  }
}