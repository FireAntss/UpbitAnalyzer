import React from 'react';
import { useCoinStore } from '@stores/CoinStore';
import { useParams } from 'react-router-dom';
import CryptoItemPrices from '@components/CryptoItemPrices';
import TickerCarousel from '@components/TickerCarousel';
import CryptoItemInfo from '@components/CryptoItemInfo';
import SimpleChartItem from '@components/SimpleChartItem';

const CryptocurrencyItem = () => {
  const { coin } = useParams<{ coin: string }>();
  const coinList = useCoinStore((state) => state.coinList);
  const coinItem = coinList.find((i) => i.market == coin);
  return coinItem ? (
    <div className="container-fluid">
      <TickerCarousel />

      <CryptoItemInfo key={coinItem.english_name.replace(' ', '_').toLowerCase() + '_info'} />
      <CryptoItemPrices />
      <SimpleChartItem ticker={coinItem.market} />
    </div>
  ) : (
    <></>
  );
};

export default CryptocurrencyItem;
