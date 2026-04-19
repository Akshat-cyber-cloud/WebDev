import type { Response } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (res: Response, userId: string) => {
  const token = jwt.sign(
    { userId },
    (process.env.JWT_SECRET as string) || 'secret',
    {
      expiresIn: (process.env.JWT_EXPIRE as any) || '30d',
    }
  );

  const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRE || '30');

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure in production
    sameSite: process.env.NODE_ENV === 'development' ? 'strict' : 'none', 
    maxAge: cookieExpireDays * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
