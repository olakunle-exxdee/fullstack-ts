import { useState } from 'react';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../slices/productSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice';

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
function invariant(value: unknown): asserts value {
  if (value) return;

  throw new Error('Invariant violation');
}

const ProductScreen = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  invariant(params.id);

  const {
    data: product,
    error,
    isLoading,
  } = useGetProductDetailsQuery(params.id);

  const dispatch: AppDispatch = useDispatch();

  const addToCartHandler = () => {
    if (product) {
      dispatch(addToCart({ ...product, qty }));
      navigate(`/cart`);
    }
  };

  if (isLoading) return <Loader />;

  if (error) {
    const errorMessage =
      'message' in error
        ? error.message // Handle FetchBaseQueryError
        : 'An error occurred'; // Handle other types of errors
    return <Message variant='danger'>{errorMessage}</Message>;
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product?.image} alt={product?.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{product?.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product?.rating || 0}
                text={product?.numReviews || 0}
              />
            </ListGroupItem>
            <ListGroupItem>Price: ${product?.price}</ListGroupItem>
            <ListGroupItem>Description: {product?.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product?.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product && product?.countInStock > 0
                        ? 'In Stock'
                        : 'Out of Stock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroupItem>
              {product && product?.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <select
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}>
                        {[...Array(product?.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}
              <ListGroupItem>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={!product?.countInStock}
                  onClick={addToCartHandler}>
                  Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
