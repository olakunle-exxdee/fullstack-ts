import mongoose, { Document, Schema, Types } from 'mongoose';

interface Review {
  user: Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}
interface Product extends Document {
  user: Types.ObjectId;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  review: Review[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}

const reviewSchema = new Schema<Review>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const ProductSchema = new Schema<Product>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    review: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<Product>('Product', ProductSchema);

export default Product;
