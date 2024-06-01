import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from './Message';
import Loader from './Loader';
import { useGetTopProductsQuery } from '../slices/productSlice';
import { ProductType } from '../screens/HomeScreeen';

const ProductCarousel = () => {
  const { data: products, error, isLoading } = useGetTopProductsQuery();

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
      <Carousel pause='hover' className='bg-primary mb-4'>
        {products?.map((product: ProductType) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image
                className='w-75 mx-auto d-block'
                src={product.image}
                alt={product.name}
                fluid
              />
              <Carousel.Caption className='carousel-caption'>
                <h2>
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ProductCarousel;
