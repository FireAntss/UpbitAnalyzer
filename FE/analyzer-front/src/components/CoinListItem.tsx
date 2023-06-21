import React, { memo } from 'react';
import { useCoinStore } from '@stores/CoinStore';
import SimpleChart from './SimpleChart';
import { setStringNumber } from '@utils/numbers';
import { Link } from 'react-router-dom';

const CoinListItem = memo(({ ticker, index }: { ticker: string; index: number }) => {
  const coinList = useCoinStore((state) => state.coinList);

  const coin = coinList.find((item) => item.market === ticker);
  const placeholderTd = () => (
    <td className="placeholder-glow">
      <span className="placeholder col"></span>
    </td>
  );
  const placeholderSpan = () => (
    <div className="placeholder-glow">
      <span className="placeholder col"></span>
    </div>
  );

  return coin ? (
    <tr className="align-middle">
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <span className="index_num text8">{index}</span>
      </td>
      <td>
        <div className="d-flex">
          <Link to={`/cryptocurrency/${coin.market}`}>
            <div className="inner_box">
              {coin.symbol ? (
                <img className="symbol" src={coin.symbol} alt={coin.market.split('-')[1].toLowerCase() + '_symbol'} />
              ) : (
                placeholderSpan()
              )}
              <div className="name_area">
                <span className="coin_name">{coin.korean_name}</span>
                {coin.market ? (
                  <div className="symbol_ticker">
                    <span className="text8">{coin.market.split('-')[1]}</span>
                  </div>
                ) : (
                  placeholderSpan()
                )}
              </div>
            </div>
          </Link>
        </div>
      </td>
      <td className="td_price">
        <div className={`coin_item ${coin.change === 'RISE' ? 'up' : coin.change === 'FALL' ? 'down' : 'even'}`}>
          <Link key={coin.english_name.replace(' ', '_').toLowerCase()} to={`/cryptocurrency/${coin.market}`}>
            <span className="coin_price">{coin.trade_price?.toLocaleString('ko-KR')}</span>
            <div
              className={`badge ${coin.change === 'RISE' ? 'bg-up' : coin.change === 'FALL' ? 'bg-down' : 'bg-even'}`}
            >
              {(coin.signed_change_rate * 100).toFixed(2)}
            </div>
          </Link>
        </div>
      </td>
      {coin.low_price ? (
        <td className="td_price">
          <div className="low">
            <span>{coin.low_price?.toLocaleString('ko-KR')}</span>
          </div>
        </td>
      ) : (
        placeholderTd()
      )}
      {coin.high_price ? (
        <td className="td_price">
          <div className="high">
            <span>{coin.high_price?.toLocaleString('ko-KR')}</span>
          </div>
        </td>
      ) : (
        placeholderTd()
      )}
      {coin.acc_trade_price_24h ? (
        <td className="td_price acc_trade">
          <div className="trade_24h">
            <span>{setStringNumber(coin.acc_trade_price_24h)}</span>
          </div>
        </td>
      ) : (
        placeholderTd()
      )}
      {coin.trade_price ? (
        <td className="td_chart">
          <div className="simple_chart">
            <SimpleChart ticker={coin.market} />
          </div>
        </td>
      ) : (
        placeholderTd()
      )}
    </tr>
  ) : (
    <tr>{placeholderTd()}</tr>
  );
});

export default CoinListItem;
