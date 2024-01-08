import { apiSlice } from './apiSlice';
import { ORDER_URL } from './../constants';

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ORDER_URL,
    }),
    createOrder: builder.mutation({

      query: (order) => ({
        url: ORDER_URL,
        method: 'POST',
        body: { ...order },
        
      }),
    }),
  }),
});
export const { useGetOrdersQuery, useCreateOrderMutation } = orderApiSlice;
