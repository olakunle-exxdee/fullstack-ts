import express, { Request, Response } from 'express';
import products from './data/products';

const port = 5000;

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
