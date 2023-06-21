import useCoinList from '@hooks/useCoinList';
import React from 'react';

const Home = () => {
  const { coinList, coinListRef } = useCoinList();
  return (
    <div className="container">
      <p>hello</p>
    </div>
  );
};

export default Home;
