import React from 'react';
import { useCoinStore } from '@stores/CoinStore';
import { setNumComma, setStringNumber } from '@utils/numbers';
import { useParams } from 'react-router-dom';

const CryptoItemPrices = () => {
  const { coin } = useParams<{ coin: string }>();
  const coinList = useCoinStore((state) => state.coinList);
  const coinItem = coinList.find((i) => i.market == coin);

  return coinItem ? (
    <div className="price_box">
      <div className="today_price">
        <span>24h Range</span>
        <div className="today_pricebar">
          <svg viewBox="0 0 100 10" className="progress-svg">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#1261c4', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#c84a31', stopOpacity: 1 }} />
              </linearGradient>
              <mask id="progressMask">
                <rect
                  className="gradient_bar"
                  x="0"
                  y="0"
                  width={`${
                    ((coinItem.trade_price - coinItem.low_price) / (coinItem.high_price - coinItem.low_price)) * 100
                  }%`}
                  height="100%"
                  fill="white"
                />
              </mask>
            </defs>
            <rect
              className="bar"
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#progressGradient)"
              mask="url(#progressMask)"
            />
          </svg>
        </div>

        <div className="price_range">
          <div className="price">
            <span>{coinItem.low_price.toLocaleString('ko-KR')}</span>
            <span className="">{coinItem.trade_price.toLocaleString('ko-KR')}</span>
            <span>{coinItem.high_price.toLocaleString('ko-KR')}</span>
          </div>
        </div>
      </div>
      <div className="acc_price_box">
        <div className="acc_price">
          <span>누적 거래대금</span>
          <span>{setNumComma(coinItem.acc_trade_price)}</span>
        </div>
        <div className="acc_volum">
          <span>누적 거래량</span>
          <span>{setNumComma(coinItem.acc_trade_volume)}</span>
        </div>
      </div>
      <div className="w52_price">
        <div>
          <span className="new_high">52주 신고가</span>
          <div className="price">
            <span>{setNumComma(coinItem.highest_52_week_price)}</span>
            <span>{coinItem.highest_52_week_date}</span>
          </div>
        </div>
        <div>
          <span className="new_low">52주 신저가</span>
          <div className="price">
            <span>{setNumComma(coinItem.lowest_52_week_price)}</span>
            <span>{coinItem.lowest_52_week_date}</span>
          </div>
        </div>
      </div>
      <div>
        <span>Less stats</span>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CryptoItemPrices;
