import { useCandleStore } from '@stores/CoinStore';
import { coinApi } from '@utils/API';
import { format, select, timeFormat } from 'd3';
import React, { useEffect, useRef } from 'react';
import {
  AlternatingFillAreaSeries,
  BarSeries,
  CandlestickSeries,
  Chart,
  ChartCanvas,
  CrossHairCursor,
  CurrentCoordinate,
  EdgeIndicator,
  ElderRaySeries,
  HoverTooltip,
  Label,
  LineSeries,
  MouseCoordinateX,
  MouseCoordinateY,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  XAxis,
  YAxis,
  ZoomButtons,
  discontinuousTimeScaleProviderBuilder,
  elderRay,
  ema,
  lastVisibleItemBasedZoomAnchor,
  mouseBasedZoomAnchor
} from 'react-financial-charts';

const ConsoleChart = ({ ticker }: { ticker: string }) => {
  const { candles, setCandles } = useCandleStore();
  const graphRef = useRef<HTMLDivElement | any>(null);

  useEffect(() => {
    const fetchCandleData = async () => {
      try {
        const response = await coinApi.getOneCoinCandles({ coin: ticker, timeType: 'days', timeCount: 200 });
        setCandles(ticker, response.data);
      } catch (error) {
        console.error('Error fetching candle data:', error);
      }
    };
    fetchCandleData();
    console.log(candles[ticker].candle);
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
    const height = 340;

    const initialData = candles[ticker]?.candle.map((dataPoint: any) => {
      return {
        open: dataPoint.opening_price,
        high: dataPoint.high_price,
        low: dataPoint.low_price,
        close: dataPoint.trade_price,
        volume: dataPoint.candle_acc_trade_volume,
        date: new Date(dataPoint.candle_date_time_utc)
      };
    });
    if (!initialData) return null;
    if (!divWidth) return null;

    const margin = { left: 0, right: 60, top: 0, bottom: 25 };
    const pricesDisplayFormat = format(',.2f');
    const timeDisplayFormat = timeFormat('%d %b');
    const dateFormat = timeFormat('%Y-%m-%d');
    const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => d.date);

    const ema12 = ema()
      .id(1)
      .options({ windowSize: 12 })
      .merge((d: any, c: any) => {
        d.ema12 = c;
      })
      .accessor((d: any) => d.ema12);

    const ema26 = ema()
      .id(2)
      .options({ windowSize: 26 })
      .merge((d: any, c: any) => {
        d.ema26 = c;
      })
      .accessor((d: any) => d.ema26);

    const elder = elderRay();

    const calculatedData = elder(ema26(ema12(initialData)));

    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData);

    const max = xAccessor(data[data.length - 1]);
    const min = xAccessor(data.length < 50 ? 0 : data[Math.min(50, Math.floor(data.length / 2))]);
    const xExtents = [min, max + 5];
    const gridHeight = height - margin.top - margin.bottom;
    const elderRayHeight = 100;
    const elderRayOrigin = (_: number, h: number) => [0, h - elderRayHeight];
    const barChartHeight = gridHeight / 4;
    const barChartOrigin = (_: number, h: number) => [0, h - barChartHeight - elderRayHeight];
    const chartHeight = gridHeight - elderRayHeight;

    return (
      <ChartCanvas
        height={height}
        ratio={1}
        width={divWidth}
        margin={margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        <Chart id={1} height={barChartHeight} origin={barChartOrigin} yExtents={barChartExtents}>
          <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
        </Chart>
        <Chart id={2} height={chartHeight} yExtents={candleChartExtents}>
          <XAxis showGridLines />
          <YAxis showGridLines tickFormat={pricesDisplayFormat} />

          <CandlestickSeries fill={openCloseColor} wickStroke={openCloseColor} />

          <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
          <CurrentCoordinate yAccessor={ema26.accessor()} fillStyle={ema26.stroke()} />
          <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
          <CurrentCoordinate yAccessor={ema12.accessor()} fillStyle={ema12.stroke()} />

          <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat} />

          <EdgeIndicator
            itemType="last"
            arrowWidth={10}
            rectWidth={margin.right}
            fill={ema26.stroke()}
            lineStroke={ema26.stroke()}
            displayFormat={pricesDisplayFormat}
            yAccessor={ema26.accessor()}
          />
          <EdgeIndicator
            itemType="last"
            arrowWidth={10}
            rectWidth={margin.right}
            fill={ema12.stroke()}
            lineStroke={ema12.stroke()}
            displayFormat={pricesDisplayFormat}
            yAccessor={ema12.accessor()}
          />
          <EdgeIndicator
            itemType="last"
            arrowWidth={10}
            rectWidth={margin.right}
            fill={openCloseColor}
            lineStroke={openCloseColor}
            displayFormat={pricesDisplayFormat}
            yAccessor={yEdgeIndicator}
          />
          <MovingAverageTooltip
            origin={[8, 24]}
            options={[
              {
                stroke: ema26.stroke(),
                type: 'EMA',
                windowSize: ema26.options().windowSize,
                yAccessor: ema26.accessor()
              },
              {
                stroke: ema12.stroke(),
                type: 'EMA',
                windowSize: ema12.options().windowSize,
                yAccessor: ema12.accessor()
              }
            ]}
          />
          <ZoomButtons />
          <OHLCTooltip origin={[8, 16]} />

          <HoverTooltip
            yAccessor={(d) => d.trade_price}
            tooltip={{
              content: ({ currentItem, xAccessor }) => ({
                x: dateFormat(xAccessor(currentItem)),
                y: [
                  {
                    label: 'open',
                    value: currentItem.open && currentItem.open.toLocaleString()
                  },
                  {
                    label: 'high',
                    value: currentItem.high && currentItem.high.toLocaleString()
                  },
                  {
                    label: 'low',
                    value: currentItem.low && currentItem.low.toLocaleString()
                  },
                  {
                    label: 'close',
                    value: currentItem.close && currentItem.close.toLocaleString()
                  }
                ]
              })
            }}
          />
        </Chart>

        <Chart
          id={4}
          height={elderRayHeight}
          yExtents={[0, elder.accessor()]}
          origin={elderRayOrigin}
          padding={{ top: 8, bottom: 8 }}
        >
          <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
          <YAxis ticks={4} tickFormat={pricesDisplayFormat} />

          <MouseCoordinateX displayFormat={timeDisplayFormat} />
          <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat} />

          <ElderRaySeries
            yAccessor={elder.accessor()}
            fillStyle={{ bearPower: 'rgba(33, 150, 243, 0.3)', bullPower: 'rgba(239, 83, 80, 0.3)' }}
          />

          <SingleValueTooltip
            yAccessor={elder.accessor()}
            yLabel="Elder Ray"
            yDisplayFormat={(d: any) => `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(d.bearPower)}`}
            origin={[8, 16]}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  };
  const barChartExtents = (data: any) => {
    return data.volume;
  };
  const candleChartExtents = (data: any) => {
    return [data.high, data.low];
  };
  const yEdgeIndicator = (data: any) => {
    return data.close;
  };
  const volumeColor = (data: any) => {
    return data.close > data.open ? 'rgba(239, 83, 80, 0.3)' : 'rgba(33, 150, 243, 0.3)';
  };
  const volumeSeries = (data: any) => {
    return data.volume;
  };
  const openCloseColor = (data: any) => {
    return data.close > data.open ? '#ef5350' : '#2196F3';
  };

  return (
    <div className="console_chart_view" ref={graphRef}>
      <div className="canvas_box">{drawChart()}</div>
    </div>
  );
};

export default ConsoleChart;
