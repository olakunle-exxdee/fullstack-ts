import express, { Request, Response, NextFunction, Router } from 'express';

import asyncHandler from '../middleware/asyncHandler';
import Product from '../models/productModel';

const router: Router = express.Router();

router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find({});
    res.json(products);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const product = Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    }
    res.status(404);
    throw new Error('Product not found');
  })
);

export default router;
