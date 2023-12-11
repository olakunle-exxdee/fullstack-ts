import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../screens/HomeScreeen';

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
      // calculate item price
      state.itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      // calculate shipping price
      state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
      // calculate tax price
      state.taxPrice = Number(0.15 * state.itemsPrice).toFixed(
        2
      ) as unknown as number;
      // calculate total price
      state.totalPrice = Number(
        Number(state.itemsPrice) +
          Number(state.shippingPrice) +
          Number(state.taxPrice)
      ).toFixed(2) as unknown as number;
      localStorage.setItem('cart', JSON.stringify({ ...state }));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
