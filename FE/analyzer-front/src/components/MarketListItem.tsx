import React, { memo } from 'react';
import { useCoinStore } from '@stores/CoinStore';

const MarketListItem = memo(({ ticker }: { ticker: string }) => {
  const coinList = useCoinStore((state) => state.coinList);

  const coin = coinList.find((item) => item.market === ticker);
  const placeholderSpan = () => (
    <div className="placeholder-glow">
      <span className="placeholder col"></span>
    </div>
  );
  return coin ? (
    <div className="d-flex">
      <div className="coin_symbol_box">
        <div className="coin_symbol">
          <img className="symbol" src={coin.symbol} alt={coin.market.split('-')[1].toLowerCase() + '_symbol'} />
        </div>
      </div>
      <div className="coin_name_box">
        {coin.korean_name ? (
          <div className="coin_name">
            <strong className="mb-1">{coin.korean_name}</strong>
          </div>
        ) : (
          placeholderSpan()
        )}
        {coin.market ? (
          <div className="market_code">
            <span>{coin.market.split('-')[1] + '/' + coin.market.split('-')[0]}</span>
          </div>
        ) : (
          placeholderSpan()
        )}
      </div>
      {coin.trade_price ? (
        <div className="trade_price">
          <span>{coin.trade_price?.toLocaleString('ko-KR')}</span>
        </div>
      ) : (
        placeholderSpan()
      )}
      <div className="chang_rate_box">
        <div className={`badge ${coin.change === 'RISE' ? 'bg-up' : coin.change === 'FALL' ? 'bg-down' : 'bg-even'}`}>
          {(coin.signed_change_rate * 100).toFixed(2)}
        </div>
      </div>
    </div>
  ) : (
    placeholderSpan()
  );
});

export default MarketListItem;
