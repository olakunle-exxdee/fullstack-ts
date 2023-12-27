import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreeen from './screens/HomeScreeen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { store } from './store';
import { Provider } from 'react-redux';
import Message from './components/Message';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreeen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route
        path='*'
        element={<Message variant='danger'>{'An error occurred'}</Message>}
      />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
