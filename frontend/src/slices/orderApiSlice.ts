import { apiSlice } from './apiSlice';
import { ORDER_URL, PAYPAL_URL } from './../constants';

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ORDER_URL,
      keepUnusedDataFor: 5,
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDER_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),
    getOrdersDetails: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDER_URL}/${orderId}/pay`,
        method: 'PUT',
        body: { ...details },
      }),
    }),
    deliverOrder: builder.mutation({
      query: (ordeId) => ({
        url: `${ORDER_URL}/${ordeId}/deliver`,
        method: 'PUT',
      }),
    }),
    getPaypalClientID: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});
export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetOrdersDetailsQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
  useGetPaypalClientIDQuery,
  useGetMyOrdersQuery,
} = orderApiSlice;
