import { useCoinStore } from '@stores/CoinStore';
import { coinApi } from '@utils/API';
import { numberWithCommas, setNumComma, setNumCommaBeak } from '@utils/numbers';
import React, { memo, useEffect, useState } from 'react';

const OrderBook = ({ ticker }: { ticker: string }) => {
  const [orderbook, setOrderbook] = useState<any>([]);
  const [ticks, setTicks] = useState<any>([]);

  const coinList = useCoinStore((state) => state.coinList);
  const coinItem = coinList.find((i) => i.market === ticker);

  const fetchCandleData = async () => {
    try {
      const resOderBook = await coinApi.getInitOrderbooks(ticker);
      const resTicks = await coinApi.getOneCoinTradeLists(ticker);

      setOrderbook(resOderBook.data[0]);
      setTicks(resTicks.data);
    } catch (error) {
      console.error('Error fetching candle data:', error);
    }
  };
  useEffect(() => {
    setInterval(fetchCandleData, 10000);
  }, [ticker]);

  if (!orderbook) {
    return null;
  }

  return orderbook ? (
    <table className="table table-hover orderbook">
      <thead>
        <tr>
          <td className="size"></td>
          <td className="price"></td>
          <td className="size"></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="up size">
            <span>{orderbook.orderbook_units?.reverse()[0].bid_size}</span>
          </td>
          <td className="up price">
            <span>{orderbook.orderbook_units?.reverse()[0].bid_price.toLocaleString()}</span>
          </td>
          <td rowSpan={14} className="inner">
            <div>
              <dl>
                <dt>{coinItem.market.replace('-', '/')}</dt>
              </dl>
              <dl>
                <dt>거래량</dt>
                <dd>
                  {setNumComma(coinItem.acc_trade_volume_24h)}
                  <i>BTC</i>
                </dd>

                <dt>거래대금</dt>
                <dd>
                  {setNumCommaBeak(coinItem.acc_trade_price_24h)}
                  <i>백만원</i>
                </dd>
              </dl>

              <dl>
                <dt>52주 최고</dt>
                <dd>
                  <span className="up">{coinItem.highest_52_week_price.toLocaleString()}</span>
                  <em>({coinItem.highest_52_week_date})</em>
                </dd>

                <dt>52주 최저</dt>
                <dd>
                  <span className="down">{coinItem.lowest_52_week_price.toLocaleString()}</span>
                  <em>({coinItem.lowest_52_week_date})</em>
                </dd>
              </dl>

              <dl>
                <dt>전일종가</dt>
                <dd>{coinItem.prev_closing_price.toLocaleString()}</dd>

                <dt>당일고가</dt>
                <dd className="up">{coinItem.high_price.toLocaleString()}</dd>

                <dt>당일저가</dt>
                <dd className="down">{coinItem.low_price.toLocaleString()}</dd>
              </dl>
            </div>
          </td>
        </tr>

        {orderbook.orderbook_units
          ?.reverse()
          .slice(1, -1)
          .map((i: any) => (
            <tr className="up">
              <td className="size">
                <span>{i.bid_size}</span>
              </td>
              <td className="price">
                <span>{i.bid_price.toLocaleString()}</span>
              </td>
            </tr>
          ))}
        <tr>
          <td rowSpan={14} className="inner top">
            <div className="inner_box">
              {ticks ? (
                <table className="table">
                  <colgroup>
                    <col width={60} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>체결가</th>
                      <th>체결량</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticks.map((t: any) => (
                      <tr>
                        <td className={t.ask_bid == 'ASK' ? 'up' : 'down'}>{t.trade_price.toLocaleString()}</td>
                        <td className={t.ask_bid == 'ASK' ? 'up' : 'down'}>{t.trade_volume.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </div>
          </td>
          <td className="down price">
            <span>{orderbook.orderbook_units?.[0].ask_price.toLocaleString()}</span>
          </td>
          <td className="down size">
            <span>{orderbook.orderbook_units?.[0].ask_size}</span>
          </td>
        </tr>
        {orderbook.orderbook_units?.slice(1, -1).map((i: any) => (
          <tr className="down">
            <td className="price">
              <span>{i.ask_price.toLocaleString()}</span>
            </td>
            <td className="size">
              <span>{i.ask_size}</span>
            </td>
          </tr>
        ))}
        <tr className="totals">
          <td className="total_size">
            <span>{orderbook.total_ask_size}</span>
          </td>
          <td className="total_size_tit">수량</td>
          <td className="total_size">
            <span>{orderbook.total_bid_size}</span>
          </td>
        </tr>
      </tbody>
    </table>
  ) : null;
};

export default memo(OrderBook);
