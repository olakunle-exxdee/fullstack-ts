import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler';
import User from '../models/userModel';
import { Request, Response, NextFunction } from 'express';

// protected routes
const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    //Read the JWt from cookie

    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded: jwt.JwtPayload = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as jwt.JwtPayload;

        (req as any).user = await User.findById(decoded.id).select('-password');

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
);

// Admin Middleware

const admin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user && (req as any).user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
