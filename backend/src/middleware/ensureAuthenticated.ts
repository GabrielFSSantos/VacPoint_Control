import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'No token provided.' });
  }

  const parts = authHeader.split(' ');

  if (!(parts.length === 2)) {
    return response.status(401).json({ error: 'Token error.' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ error: 'Token bad formatted.' });
  }

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.entity = {
      id: sub,
    }

    return next();
    
  } catch {
    return response.status(400).json({ error: 'token invalid.' });
  }
}