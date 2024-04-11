import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

import { useGetOrdersQuery } from '../../slices/orderApiSlice';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const OrderListScreen = () => {
  const { data: orders, error, isLoading } = useGetOrdersQuery('');
  console.log(orders);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    const errorMessage =
      'message' in error
        ? error.message // Handle FetchBaseQueryError
        : 'An error occurred'; // Handle other types of errors

    return <Message variant='danger'>{errorMessage}</Message>;
  }
  return (
    <>
      <h1>Orders</h1>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>

            <th>Total</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order: any) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>

              <td>${order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button variant='light' className='btn-sm'>
                    Details
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default OrderListScreen;
