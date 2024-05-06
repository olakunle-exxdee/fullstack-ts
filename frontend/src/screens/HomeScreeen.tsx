import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

export interface ProductType {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  review: [];
  qty: number;
}

const HomeScreeen = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
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
      <h1>Lastest Products</h1>

      <Row>
        {products?.map((product: ProductType) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreeen;
