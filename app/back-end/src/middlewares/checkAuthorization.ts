import { Request, Response, NextFunction } from 'express';
import JWT from '../auth/JWT';

const jwt = new JWT();

const checkAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.checkToken(token);
    if (decoded) next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default checkAuthorization;