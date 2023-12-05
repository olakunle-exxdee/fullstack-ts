import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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

import { ProductProps } from './HomeScreeen';
import axios from 'axios';
const ProductScreen = () => {
  const [product, setProduct] = useState<ProductProps>();
  const { id } = useParams();
  useEffect(() => {
    // use axios to fetch data from backend
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

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
              <ListGroupItem>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={!product?.countInStock}>
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
