import { Response } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (res: Response, id: string) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });

  // set Jwt  as httpOnly cookie

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
