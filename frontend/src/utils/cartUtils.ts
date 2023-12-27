import { CartState } from '../slices/cartSlice';
export const addDecimals = (num: number) => {
  return Math.round(num * 100) / 100;
};

export const updateCart = (state: CartState) => {
  // calculate item price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // calculate shipping price
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  // calculate tax price
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  // calculate total price
  state.totalPrice = addDecimals(
    Number(
      Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2) as unknown as number
  );
  localStorage.setItem('cart', JSON.stringify({ ...state }));

  return state;
};
