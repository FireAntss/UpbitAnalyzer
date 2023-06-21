import React, { memo, useState } from 'react';

import CoinListItem from '@components/CoinListItem';
import useCoinDetails from '@hooks/useCoinDetails';
import useWebSocketDetails from '@hooks/useWebsocket';

const CoinList = memo(() => {
  const coinList = useCoinDetails();
  const [visibleCoins, setVisibleCoins] = useState(10);

  useWebSocketDetails();

  const handleLoadMore = () => {
    if (coinList && visibleCoins >= coinList.length) return;
    setVisibleCoins((prevVisibleCoins) => prevVisibleCoins + 5);
  };

  // SortState
  const sortedList = coinList?.sort((a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h);
  return (
    <div className="card-body">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-3per tdMin"></th>
            <th className="col-3per tdMin">#</th>
            <th className="col-10per">코인</th>
            <th className="col-10per">현재가</th>
            <th className="col-10per">24h Low</th>
            <th className="col-10per">24h High</th>
            <th className="col-2per">24h 거래대금</th>
            <th className="col-15per td_chart">최근 7일</th>
          </tr>
        </thead>
        <tbody>
          {coinList ? (
            coinList
              .slice(0, visibleCoins)
              .map((coin, i) => <CoinListItem key={coin.market.split('-')[1]} index={i + 1} ticker={coin.market} />)
          ) : (
            <tr>
              <td className="placeholder col" colSpan={7}></td>
            </tr>
          )}
        </tbody>
      </table>
      {coinList && coinList.length > visibleCoins && (
        <div className="d-grid">
          <button className="btn btn-secondary" type="button" onClick={handleLoadMore}>
            더보기
          </button>
        </div>
      )}
    </div>
  );
});

export default CoinList;
