import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import * as products from './data/products';
const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

app.get('/api/products', (req: Request, res: Response) => {
  res.json(products.default);
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = products.default.find((p) => p._id === req.params.id);
  res.json(product);
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
