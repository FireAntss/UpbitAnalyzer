import React, { memo, useEffect, useRef } from 'react';
import { useCandleStore } from '@stores/CoinStore';
import { coinApi } from '@utils/API';
import { curveMonotoneX, line, scaleLinear, scaleTime, select, timeParse } from 'd3';

const SimpleChart = memo(({ ticker }: { ticker: string }) => {
  const graphRef = useRef<SVGSVGElement>(null);
  const { candles, setCandles } = useCandleStore();

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
    setInterval(fetchCandleData, 60000);
  }, [ticker, setCandles]);

  useEffect(() => {
    if (candles && candles[ticker]?.candle) {
      drawChart();
    }
  }, [candles, ticker]);

  const drawChart = () => {
    const svg = select(graphRef.current);
    const margin = { top: 5, right: 5, bottom: 5, left: 5 };
    const width = svg.node()?.parentElement?.clientWidth || 0; // 부모 요소의 너비 가져오기
    const height = 30 - margin.top - margin.bottom;

    svg.selectAll('*').remove(); // 기존 그래프 요소 삭제
    const candleData = Object.values(candles[ticker]?.candle);

    if (!candleData.length) {
      // candle 데이터가 비어있을 때 처리
      return;
    }

    // 데이터의 최소값과 최대값 찾기
    const minValue = Math.min(...candleData.map((data: { trade_price: number }) => data.trade_price));
    const maxValue = Math.max(...candleData.map((data: { trade_price: number }) => data.trade_price));

    // x축 스케일 설정
    const parseTime = timeParse('%Y-%m-%dT%H:%M:%S');
    const x = scaleTime()
      .domain([
        parseTime(candleData[0].candle_date_time_kst) as Date,
        parseTime(candleData[candleData.length - 1].candle_date_time_kst) as Date
      ])
      .range([0, width]);

    // y축 스케일 설정
    const y = scaleLinear().domain([minValue, maxValue]).range([height, 0]);

    // 그래프 영역 설정
    const graph = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    // 선 그래프 그리기
    const lineGenerator = line<any>()
      .defined((data: any) => data.candle_date_time_kst !== null)
      .x((data: any) => x(parseTime(data.candle_date_time_kst)!))
      .y((data: any) => y(data.trade_price)!)
      .curve(curveMonotoneX); // 곡선 그래프를 그리기 위해 curveMonotoneX 추가

    graph
      .append('path')
      .datum(candleData) // 배열 형태로 변환
      .attr('fill', 'none')
      .attr('stroke', (data: any) => {
        // 마지막 데이터의 trade_price와 전일 종가를 비교하여 색상 지정
        const lastData = data[data.length - 1];
        const yesterdayData = data.find(
          (d: any) =>
            d.candle_date_time_kst &&
            parseTime(d.candle_date_time_kst)?.getDate() ===
              (parseTime(lastData.candle_date_time_kst)?.getDate() ?? 0) - 1
        );

        if (yesterdayData) {
          if (lastData.trade_price > yesterdayData.trade_price) {
            return 'red'; // 어제의 trade_price보다 크면 빨간색
          } else {
            return 'blue'; // 어제의 trade_price보다 작으면 파란색
          }
        }

        return 'steelblue'; // 어제 데이터가 없는 경우는 기본 색상인 steelblue
      })
      .attr('stroke-width', 1.5)
      .attr('d', lineGenerator);

    // svg 요소의 너비와 높이 설정
    svg.attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
  };

  return <svg ref={graphRef} style={{ width: '100%' }} />;
});

export default SimpleChart;
