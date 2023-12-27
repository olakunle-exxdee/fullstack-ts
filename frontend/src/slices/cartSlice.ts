import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../screens/HomeScreeen';
import { updateCart } from '../utils/cartUtils';

export interface CartState {
  cartItems: ProductType[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

const storedCartItems = localStorage.getItem('cart');
const initialState: CartState =
  storedCartItems && typeof storedCartItems === 'string'
    ? JSON.parse(storedCartItems)
    : { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<ProductType>) => {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === existItem._id ? item : cartItem
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state: CartState, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload
      );

      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
