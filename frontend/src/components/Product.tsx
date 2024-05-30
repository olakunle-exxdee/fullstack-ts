import { Card } from 'react-bootstrap';
import { ProductType } from '../screens/HomeScreeen';
import { Link } from 'react-router-dom';
import Rating from './Rating';
interface MyComponentProps {
  product: ProductType;
}

const Product = (product: any) => {
  return (
    <Card className=' my-3 p-y rounded '>
      <Link to={`/product/${product.product._id}`}>
        <Card.Img src={product.product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.product._id}`}>
          <Card.Title className='product-title' as='div'>
            <strong>{product.product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <div className='my-3'>
            <Rating
              value={product.product.rating}
              text={product.product.numReviews}
            />
          </div>
        </Card.Text>
        <Card.Text as='h3'>${product.product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
