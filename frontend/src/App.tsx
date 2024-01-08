import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

export const LocationDisplay = () => {
  const location = useLocation();
  console.log(location);

  return <div data-testid='location-display'>{location.pathname}</div>;
};

const App = () => {
  return (
    <>
      <Header />
      <main className='test-center py-3'>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
      <LocationDisplay />
    </>
  );
};

export default App;
