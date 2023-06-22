import { coinApi } from '@utils/API';
import React, { useEffect, useState } from 'react';

const TradeBox = ({ ticker }: { ticker: string }) => {
  const [ticks, setTicks] = useState<any>([]);

  useEffect(() => {
    const fetchCandleData = async () => {
      try {
        const resTicks = await coinApi.getOneCoinTradeLists(ticker);
        setTicks(resTicks.data);
      } catch (error) {
        console.error('Error fetching candle data:', error);
      }
    };
    fetchCandleData();
    const interval = setInterval(fetchCandleData, 1000);
    return () => clearInterval(interval);
  }, [ticker]);

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th className="trade_time">체결시간</th>
          <th className="trade_col">체결가격</th>
          <th className="trade_col">체결량</th>
          <th className="trade_col">체결금액</th>
        </tr>
      </thead>
      <tbody>
        {ticks
          ? ticks.map((t: any) => (
              <tr className={t.ask_bid === 'ASK' ? 'up' : 'down'}>
                <td>
                  <span className="date">{t.trade_date_utc}</span> <span>{t.trade_time_utc}</span>
                </td>
                <td className="price">
                  <b>{t.trade_price}</b>
                </td>
                <td className="price">{t.trade_volume}</td>
                <td className="price">{(t.trade_price * t.trade_volume).toLocaleString()}</td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};

export default TradeBox;
