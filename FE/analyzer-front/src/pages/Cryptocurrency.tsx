import React from 'react';
import CoinList from '@components/CoinList';
import useCoinList from '@hooks/useCoinList';

const Cryptocurrency = () => {
  const { coinList, coinListRef } = useCoinList();

  return (
    <div className="container">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            <h5 className="card-title">Realtime Cryptocurrency Prices by Upbit</h5>
          </div>

          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
        <CoinList />
      </div>
    </div>
  );
};

export default Cryptocurrency;
