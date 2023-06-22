import { useEffect, useRef } from 'react';
import { useCoinStore } from '@stores/CoinStore';
import { coinApi } from '@utils/API';

const useCoinList = () => {
  const coinList = useCoinStore((state) => state.coinList);
  const setCoinList = useCoinStore((state) => state.setCoinList);
  const coinListRef = useRef(coinList);

  const fetchCoinCodes = async () => {
    try {
      const marketCodes = await coinApi.getMarketCodes();
      const filteredList = marketCodes.data.filter((coin: any) => coin.market.includes('KRW'));
      setCoinList(filteredList);
      coinListRef.current = filteredList;
    } catch (error) {
      console.error('Error Fetching Coins:', error);
    }
  };

  useEffect(() => {
    if (coinList.length === 0) {
      fetchCoinCodes();
    }
    return () => {
      console.log('Disconnected CoinList Codes');
    };
  }, []);

  return {
    coinList,
    coinListRef
  };
};

export default useCoinList;
