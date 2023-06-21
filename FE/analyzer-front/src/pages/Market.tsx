import React from 'react';
import useCoinList from '@hooks/useCoinList';
import { Navigate, Route } from 'react-router-dom';

const Market = () => {
  const { coinList, coinListRef } = useCoinList();

  return (
    <div>
      coinList && <Navigate to={`/market/${coinList[0].market}`} replace={true}></Navigate>
    </div>
  );
};
export default Market;
