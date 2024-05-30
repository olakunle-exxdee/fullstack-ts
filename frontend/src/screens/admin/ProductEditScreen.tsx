import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from '../../slices/productSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: productDetails,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId as string);

  const [uploadProductImage] = useUploadProductImageMutation();

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (productDetails) {
      setName(productDetails.name);
      setPrice(productDetails.price);
      setImage(productDetails.image);
      setBrand(productDetails.brand);
      setCategory(productDetails.category);
      setCountInStock(productDetails.countInStock);
      setDescription(productDetails.description);
    }
  }, [productDetails]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

   

    const result = await updateProduct(updatedProduct);

    if ('error' in result && result.error) {
      toast.error('Product update failed');
    } else {
      toast.success('Product updated successfully');
      refetch();
      navigate('/admin/productlist');
    }
  };

  const uploadFileHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
  

    const formData = new FormData();
    formData.append('image', file);

    try {
      const result = await uploadProductImage(formData).unwrap();
      toast.success('Image uploaded successfully', result.message);
      setImage(result.image);
    } catch (err: any) {
      toast.error('Image upload failed' || err?.data?.message || err.error);
    }
  };
  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.toString()}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='price' className='my-2'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter your price'
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId='image' className='my-2'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Label>Choose File</Form.Label>
              <Form.Control
                type='file'
                placeholder='Enter your image'
                onChange={uploadFileHandle}
              />
            </Form.Group>

            <Form.Group controlId='brand' className='my-2'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='countInStock' className='my-2'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter your countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId='category' className='my-2'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='description' className='my-2'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
