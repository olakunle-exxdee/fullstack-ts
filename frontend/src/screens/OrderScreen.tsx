import { useEffect } from 'react';
import {
  useGetOrdersDetailsQuery,
  useGetPaypalClientIDQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from '../slices/orderApiSlice';

import { useSelector } from 'react-redux';

import { Link, useParams } from 'react-router-dom';

import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import {
  PayPalButtons,
  usePayPalScriptReducer,
  SCRIPT_LOADING_STATE,
} from '@paypal/react-paypal-js';

import Message from '../components/Message';
import Loader from '../components/Loader';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    error,
    refetch,
    isLoading,
  } = useGetOrdersDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay, error: errorPay }] =
    usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: errorPaypal,
  } = useGetPaypalClientIDQuery('');

  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!errorPaypal && !loadingPaypal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            clientId: paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({
          type: 'setLoadingStatus',
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPaypal, loadingPaypal, order, paypal, paypalDispatch]);

  const onApprove = async (data: any, actions: any) => {
    return actions.order.capture().then(async (details: any) => {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment successful');
      } catch (error) {
        console.log(error);

        toast.error('Payment failed');
      }
    });
  };
  // const onApproveTest = async () => {
  //   await payOrder({
  //     orderId,
  //     details: {
  //       payer: {},
  //     },
  //   });
  //   refetch();
  //   toast.success('Payment successful');
  // };

  const onError = (err: any) => {
    toast.error('Payment failed');
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId: any) => {
        return orderId;
      });
  };

  if (isLoading) return <Loader />;
  if (error)
    return (
      <Message variant='danger'>
        {' '}
        {'status' in error && 'error' in error && error.status === 'FETCH_ERROR'
          ? error.error
          : 'An error occurred'}
      </Message>
    );

  const deliverOrderHandle = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order delivered');
    } catch (error) {
      toast.error('Delivery failed');
    }
  };

  console.log(order.isDelivered);

  return (
    <div>
      <h1>Order {order?._id}</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant='danger'>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item: any, index: any) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {
                /* PAY ORDER PLACEHOLDER */

                !order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {errorPay && (
                      <Message variant='danger'>
                        {' '}
                        {'status' in errorPay &&
                        'error' in errorPay &&
                        errorPay.status === 'FETCH_ERROR'
                          ? errorPay.error
                          : 'An error occurred'}
                      </Message>
                    )}
                    {isPending ? (
                      <Loader />
                    ) : (
                      <div>
                        {/* <Button
                          style={{ marginBottom: '10px' }}
                          onClick={onApproveTest}>
                          Test Pay Order
                        </Button> */}
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}></PayPalButtons>
                        </div>
                      </div>
                    )}
                  </ListGroup.Item>
                )
              }
              {
                /* {MARK AS DELIVERED PLACEHOLDER} */

                userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroup.Item>
                    {loadingDeliver && <Loader />}
                    {errorPay && (
                      <Message variant='danger'>
                        {' '}
                        {'status' in errorPay &&
                        'error' in errorPay &&
                        errorPay.status === 'FETCH_ERROR'
                          ? errorPay.error
                          : 'An error occurred'}
                      </Message>
                    )}
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverOrderHandle}>
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )
              }
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
