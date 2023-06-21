import axios from 'axios';

export const coinApi = {
  getMarketCodes: () => axios.get('https://api.upbit.com/v1/market/all?isDetails=false'),
  getCoinInfo: (coin: string) => axios.get(`https://api.coingecko.com/api/v3/coins/${coin}?community_data=true`),
  getInitCandles: (coin: string) => axios.get(`https://api.upbit.com/v1/ticker?markets=${coin}`),
  getInitOrderbooks: (coin: string) => axios.get(`https://api.upbit.com/v1/orderbook?markets=${coin}`),
  getOneCoinCandles: ({ coin, timeType, timeCount }: { coin: string; timeType: string; timeCount: number }) => {
    if (timeType === 'minutes')
      return axios
        .get(`https://api.upbit.com/v1/candles/${timeType}/${timeCount}?market=${coin}&count=200`)
        .then((res) => {
          return {
            ...res,
            data: res.data.sort((a: { timestamp: number }, b: { timestamp: number }) => a.timestamp - b.timestamp)
          };
        });
    else
      return axios.get(`https://api.upbit.com/v1/candles/${timeType}?market=${coin}&count=200`).then((res) => {
        return {
          ...res,
          data: res.data.sort((a: { timestamp: number }, b: { timestamp: number }) => a.timestamp - b.timestamp)
        };
      });
  },
  getAdditionalCoinCandles: ({
    coin,
    timeType,
    timeCount,
    datetime
  }: {
    coin: string;
    timeType: string;
    timeCount: number;
    datetime: string;
  }) => {
    if (timeType === 'minutes')
      return axios
        .get(`https://api.upbit.com/v1/candles/${timeType}/${timeCount}?market=${coin}&to=${datetime}&count=200`)
        .then((res) => {
          return {
            ...res,
            data: res.data.sort((a: { timestamp: number }, b: { timestamp: number }) => a.timestamp - b.timestamp)
          };
        });
    else
      return axios
        .get(`https://api.upbit.com/v1/candles/${timeType}?market=${coin}&to=${datetime}&count=200`)
        .then((res) => {
          return {
            ...res,
            data: res.data.sort((a: { timestamp: number }, b: { timestamp: number }) => a.timestamp - b.timestamp)
          };
        });
  },
  getOneCoinTradeLists: (coin: string) => axios.get(`https://api.upbit.com/v1/trades/ticks?market=${coin}&count=50`)
};
