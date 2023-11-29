import { Card } from 'react-bootstrap';
import { ProductProps } from '../screens/HomeScreeen';
interface MyComponentProps {
  product: ProductProps;
}

const Product = (product: MyComponentProps) => {
  return (
    <Card className=' my-3 p-y rounded '>
      <a href={`/product/${product.product._id}`}>
        <Card.Img src={product.product.image} variant='top' />
      </a>
      <Card.Body>
        <a href={`/product/${product.product._id}`}>
          <Card.Title as='div'>
            <strong>{product.product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as='div'>
          <div className='my-3'>
            {product.product.rating} from {product.product.numReviews} reviews
          </div>
        </Card.Text>
        <Card.Text as='h3'>${product.product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
