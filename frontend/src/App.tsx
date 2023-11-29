import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreeen from './screens/HomeScreeen';

const App = () => {
  return (
    <>
      <Header />;
      <main className='test-center py-3'>
        <HomeScreeen />
      </main>
      <Footer />;
    </>
  );
};

export default App;
