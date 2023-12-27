import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
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
      <LocationDisplay />
    </>
  );
};

export default App;
