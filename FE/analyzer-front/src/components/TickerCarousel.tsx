import React from 'react';
import { useCoinStore } from '@stores/CoinStore';
import { Link } from 'react-router-dom';
import { setNumComma } from '@utils/numbers';

const TickerCarousel = () => {
  const coinList = useCoinStore((state) => state.coinList);

  const extendedList = [...coinList, ...coinList, ...coinList];
  return extendedList ? (
    <div className="ticker_wrapper">
      <div className="ticker_container">
        {extendedList.map((coin, i) => (
          <div className="ticker_box" key={i}>
            <Link to={`/cryptocurrency/${coin.market}`}>
              <div className="inner_box">
                <div className="ticker_name_area">
                  <div className="ticker_symbol_box">
                    <div className="ticker_symbol">
                      <img src={coin.symbol} alt={coin.market.toLowerCase() + 'symbol'} />
                    </div>
                  </div>
                  <div className="ticker_name">
                    <span>{coin.korean_name}</span>
                    <span>{coin.english_name}</span>
                  </div>
                </div>
                <div className="ticker_prices">
                  <span>{setNumComma(coin.trade_price)}</span>
                  <div className="chang_rate_box">
                    <div
                      className={`badge ${
                        coin.change === 'RISE' ? 'bg-up' : coin.change === 'FALL' ? 'bg-down' : 'bg-even'
                      }`}
                    >
                      {(coin.signed_change_rate * 100).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default TickerCarousel;
