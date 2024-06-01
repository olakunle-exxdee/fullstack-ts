import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

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
  const { pageNumber, keyword = '' } = useParams<{
    pageNumber: string;
    keyword: string;
  }>();
  const { data, error, isLoading } = useGetProductsQuery({
    keyword,
    pageNumber: Number(pageNumber),
  });
  if (isLoading) return <Loader />;

  const products = data && data?.products;
  if (error) {
    const errorMessage =
      'message' in error
        ? error.message // Handle FetchBaseQueryError
        : 'An error occurred'; // Handle other types of errors

    return <Message variant='danger'>{errorMessage}</Message>;
  }
  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light m-2'>
          Go Back
        </Link>
      )}
      <h1>Lastest Products</h1>
      <Row>
        {products?.map((product: ProductType) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
        {products?.length === 0 ? (
          <Message variant=''>No Products Found</Message>
        ) : null}
      </Row>
      <Paginate
        pages={data?.pages}
        page={data?.page}
        isAdmin={false}
        keyword={keyword}
      />
    </>
  );
};

export default HomeScreeen;
