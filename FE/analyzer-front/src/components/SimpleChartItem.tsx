import React, { useEffect, useRef, useState } from 'react';
import { useCandleStore } from '@stores/CoinStore';
import { coinApi } from '@utils/API';
import {
  Chart,
  ChartCanvas,
  discontinuousTimeScaleProviderBuilder,
  AlternatingFillAreaSeries,
  XAxis,
  YAxis,
  HoverTooltip,
  OHLCTooltip,
  CrossHairCursor,
  CurrentCoordinate,
  Label
} from 'react-financial-charts';
import { select, timeFormat } from 'd3';
import { BoxArrowUpRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const SimpleChartItem = ({ ticker }: { ticker: string }) => {
  const { candles, setCandles } = useCandleStore();
  const graphRef = useRef<HTMLDivElement | any>(null);

  useEffect(() => {
    const fetchCandleData = async () => {
      try {
        const response = await coinApi.getOneCoinCandles({ coin: ticker, timeType: 'days', timeCount: 7 });
        setCandles(ticker, response.data);
      } catch (error) {
        console.error('Error fetching candle data:', error);
      }
    };
    fetchCandleData();
    const interval = setInterval(fetchCandleData, 10000);
    return () => clearInterval(interval);
  }, [ticker, setCandles]);

  useEffect(() => {
    if (candles && candles[ticker]?.candle) {
      drawChart();
    }
  }, [candles, ticker]);

  const drawChart = () => {
    const div = select(graphRef.current);
    const divWidth = div.node()?.parentElement.clientWidth;

    const margin = { left: 0, right: 0, top: 0, bottom: 0 };
    const initialData = candles[ticker]?.candle;
    if (!initialData) return null;

    const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
      (d: { candle_date_time_utc: any }) => new Date(d.candle_date_time_utc)
    );
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData);

    const max = xAccessor(data[data.length - 1]);
    const min = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [min, max];
    const base = 100;

    const dateFormat = timeFormat('%Y-%m-%d');

    return (
      <ChartCanvas
        height={200}
        width={divWidth}
        ratio={1}
        margin={margin}
        seriesName="Data"
        data={data}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xScale={xScale}
        xExtents={xExtents}
        clamp={true}
        disableZoom={true}
        disablePan={true}
      >
        <Chart id={1} yExtents={(d) => [d.high_price, d.low_price]}>
          <CurrentCoordinate yAccessor={(d) => d.trade_price} />
          <AlternatingFillAreaSeries
            yAccessor={(d) => d.trade_price}
            baseAt={base}
            fillStyle={{ top: 'rgba(239, 83, 80, 0.1)', bottom: 'rgba(38, 166, 154, 0.1)' }}
            strokeStyle={{ top: '#ef5350', bottom: '#26a69a' }}
          />
          <XAxis showDomain={false} showTicks={false} showTickLabel={false} showGridLines />
          <YAxis showDomain={false} showTicks={false} showTickLabel={false} showGridLines />
          <Label text="FIREANTS" x={(divWidth - margin.left - margin.right) / 2} y={120} />

          <OHLCTooltip
            accessor={(d) => ({
              open: d.opening_price,
              close: d.trade_price,
              high: d.high_price,
              low: d.low_price
            })}
            origin={[12, 21]}
            textFill={(d) => (d.trade_price > d.opening_price ? '#ef5350' : '#26a69a')}
          />
          <HoverTooltip
            yAccessor={(d) => d.trade_price}
            tooltip={{
              content: ({ currentItem, xAccessor }) => ({
                x: dateFormat(xAccessor(currentItem)),
                y: [
                  {
                    label: 'open',
                    value: currentItem.opening_price && currentItem.opening_price.toLocaleString()
                  },
                  {
                    label: 'high',
                    value: currentItem.high_price && currentItem.high_price.toLocaleString()
                  },
                  {
                    label: 'low',
                    value: currentItem.low_price && currentItem.low_price.toLocaleString()
                  },
                  {
                    label: 'close',
                    value: currentItem.trade_price && currentItem.trade_price.toLocaleString()
                  }
                ]
              })
            }}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  };

  return (
    <div className="chart_box">
      <div className="chart_select">
        <div className="view_select">
          <div className="btn lg_btn current">
            <span>Overview</span>
          </div>
          <Link className="btn lg_btn" to={`/market/${ticker}`}>
            <span>Console</span>
            <BoxArrowUpRight />
          </Link>
        </div>

        <div className="time_select">
          <div className="btn current">
            <span>1D</span>
          </div>
          <div className="btn">
            <span>7D</span>
          </div>
          <div className="btn">
            <span>1M</span>
          </div>
          <div className="btn">
            <span>1Y</span>
          </div>
        </div>

        <div className="compare_select">
          <div className="dropdown">
            <button
              id="compareDropdown"
              className="btn dropdwon-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Compare With
            </button>
            <ul className="dropdown-menu" aria-labelledby="compareDropdown">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="simple_baseline_chart" ref={graphRef}>
        <div className="canvas_box">{drawChart()}</div>
      </div>
    </div>
  );
};

export default SimpleChartItem;
