import { Request, Response, NextFunction } from 'express';
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  if (err.name === 'CastError' && (err as any).kind === 'ObjectId') {
    message = 'Invalid ID';
    statusCode = 404;
  }
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥹' : err.stack,
  });
};

export { notFound, errorHandler };
