import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { notFound, errorHandler } from './middleware/errorMiddleware';
import productRoutes from './routes/productRoutes';
import connectDB from './config/db';
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
