import express, { Request, Response, NextFunction, Router } from 'express';
import { getProducts, getProductById } from '../controllers/productController';

const router: Router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;
