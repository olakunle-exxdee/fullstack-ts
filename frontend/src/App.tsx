import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main className='test-center py-3'>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
