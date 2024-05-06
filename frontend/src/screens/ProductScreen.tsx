import { useState } from 'react';
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/productSlice';
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
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  invariant(params.id);

  const {
    data: product,
    error,
    refetch,
    isLoading,
  } = useGetProductDetailsQuery(params.id);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const userInfo = useSelector((state: RootState) => state.auth);

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
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rating) {
      toast.error('Please select a rating');
      return;
    }

    try {
      await createReview({
        productId: product?._id,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review Submitted');
      setRating(0);
      setComment('');
    } catch (err: any) {
      toast.error(err.data.message || err.error);
    }
  };
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <>
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
        <Row className='review'>
          <Col md={6}>
            <h3>Reviews</h3>
            {product?.review?.length === 0 ? (
              <Message variant=''>No Reviews</Message>
            ) : null}
            <ListGroup variant='flush'>
              {(product?.review as Array<any>)?.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} text={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2>Write a Review</h2>
                {loadingProductReview && <Loader />}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}>
                        <option value=''>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment' className='my-2'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        value={comment}
                        onChange={(e) =>
                          setComment(e.target.value)
                        }></Form.Control>
                    </Form.Group>
                    <Button
                      disabled={loadingProductReview}
                      type='submit'
                      className='btn-block my-4'
                      variant='primary'>
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message variant=''>Please login</Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </>
    </>
  );
};

export default ProductScreen;
