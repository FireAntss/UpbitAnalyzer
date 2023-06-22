import { useEffect, useState } from 'react';
import { coinApi } from '@utils/API';
import { useCoinStore } from '@stores/CoinStore';

const useCoinDetails = () => {
  const coinList = useCoinStore((state) => state.coinList);
  const setCoinList = useCoinStore((state) => state.setCoinList);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const fetchCoinDetails = async (coin: any) => {
    const coinDetails = await coinApi.getInitCandles(coin.market);
    return {
      ...coin,
      ...coinDetails.data[0],
      symbol: `https://static.upbit.com/logos/${coin.market.split('-')[1]}.png`
    };
  };

  const fetchCoinsAll = async () => {
    try {
      const updatedList: any[] = [];
      let currentIndex = 0;
      while (currentIndex <= coinList.length) {
        const batchCoins = coinList.slice(currentIndex, currentIndex + 10); // 10개의 코인만 처리
        currentIndex += 10;
        const updatedCoins = await Promise.all(batchCoins.map(fetchCoinDetails));
        updatedList.push(...updatedCoins);
        setCoinList(updatedList); // 상태 업데이트
        await delay(1000); // 1초 대기
      }
      setIsLoading(true);
    } catch (error) {
      console.error('Error Fetching Coin Details:', error);
    }
  };

  useEffect(() => {
    if (coinList.length > 0 && coinList.find((coin) => !coin.trade_price && !coin.symbol)) {
      fetchCoinsAll();
      console.log('checked');
    }
    return () => {};
  }, [coinList]);

  return coinList;
};

export default useCoinDetails;
