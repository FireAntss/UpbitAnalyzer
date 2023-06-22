import React from 'react';
import useCoinList from '@hooks/useCoinList';
import { Navigate, Route } from 'react-router-dom';
import useCoinDetails from '@hooks/useCoinDetails';

const Market = () => {
  const coinList = useCoinDetails();

  return (
    <div>
      coinList && <Navigate to={`/market/${coinList[0].market}`} replace={true}></Navigate>
    </div>
  );
};
export default Market;
