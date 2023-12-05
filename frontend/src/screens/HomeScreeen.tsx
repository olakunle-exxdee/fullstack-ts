import { Row, Col } from 'react-bootstrap';

import products from '../products';
import Product from '../components/Product';
export interface ProductProps {
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
}

const HomeScreeen = () => (
  <>
    <h1>Lastest Products</h1>

    <Row>
      {products.map((product: ProductProps) => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
  </>
);

export default HomeScreeen;
