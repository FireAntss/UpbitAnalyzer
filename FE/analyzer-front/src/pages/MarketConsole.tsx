import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCoinStore } from '@stores/CoinStore';
import ConsoleChart from '@components/ConsoleChart';
import MarketListItem from '@components/MarketListItem';
import { Asterisk, List } from 'react-bootstrap-icons';
import ConsoelTimeSelect from '@components/ConsoleTimeSelect';
import OrderBook from '@components/OrderBook';
import TradeBox from '@components/TradeBox';

const MarketConsole = () => {
  const { coin } = useParams<{ coin: string }>();
  const [sidebar, setSidebar] = useState(true); // 메뉴의 초기값을 false로 설정
  const coinList = useCoinStore((state) => state.coinList);
  const coinItem = coinList.find((i) => i.market == coin);
  const [prophet, setProphet] = useState(false); // 메뉴의 초기값을 false로 설정

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleProphet = (e: any) => {
    setProphet(!prophet);
    console.log(prophet);
  };

  const placeholderSpan = () => (
    <div className="placeholder-glow">
      <span className="placeholder col"></span>
    </div>
  );
  return (
    <div className="console_market">
      <div id="sidebar_toggle" className="side-bar">
        <div className="sidebar_header">
          <button className="btn sidebar-toggler" type="button" onClick={handleSidebar}>
            <List />
          </button>
        </div>

        <div className={'side_bar_container ' + (sidebar ? 'show' : 'hide')}>
          {coinList
            ? coinList.map((coin) => (
                <Link to={`/market/${coin.market}`}>
                  <MarketListItem key={coin.market} ticker={coin.market} />
                </Link>
              ))
            : placeholderSpan()}
        </div>
      </div>
      <div className={'market_page ' + (sidebar ? 'open' : 'close')}>
        <div className="market_body">
          <div className="market_main">
            <div className="ticker_box">
              <div className="ticker_sym_name_box">
                <div className="ticker_symbol_box">
                  <div className="ticker_symbol">
                    <img src={coinItem.symbol} alt={coinItem.market.toLowerCase() + 'symbol'} />
                  </div>
                </div>

                <div className="ticker_name">
                  <span>{coinItem.korean_name}</span>
                  <span>{coinItem.english_name}</span>
                  {coinItem.english_name === 'Bitcoin' ? (
                    <button className="prophet btn btn-primary" onClick={handleProphet}>
                      <Asterisk />
                    </button>
                  ) : (
                    <button className="prophet btn btn-secondary disabled">
                      <Asterisk />
                    </button>
                  )}
                </div>
              </div>

              <div className="ticker_price">
                <span className="coin_price">
                  <span className="unit">KRW</span>
                  {coinItem.trade_price?.toLocaleString('ko-KR')}
                </span>
                <div
                  className={`badge ${
                    coinItem.change === 'RISE' ? 'bg-up' : coinItem.change === 'FALL' ? 'bg-down' : 'bg-even'
                  }`}
                >
                  {(coinItem.signed_change_rate * 100).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="console_body">
              <div className="console_chats">
                <ConsoelTimeSelect />
                <ConsoleChart ticker={coinItem.market} />
              </div>

              <div className="console_inner">
                <div className="orderbook_box">
                  <OrderBook ticker={coinItem.market} />
                </div>

                <div className="trade_box">
                  <TradeBox ticker={coinItem.market} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketConsole;
