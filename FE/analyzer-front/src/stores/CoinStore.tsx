//TODO: Using Gecko api <https://youtu.be/0sY4fUi5dMM?t=909>
//TODO: Using upbit api <https://hichoco.tistory.com/entry/%EC%97%85%EB%B9%84%ED%8A%B8Upbit-%EC%9B%B9%EC%86%8C%EC%BC%93WebSocket%ED%8C%8C%EC%9D%B4%EC%8D%ACPython%EC%9C%BC%EB%A1%9C-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%88%98%EC%8B%A0%ED%95%98%EA%B8%B0>
import create, { SetState } from 'zustand';

type CoinStore = {
  coinList: any[];
  setCoinList: (coinList: any[]) => void;
};

export const useCoinStore = create<CoinStore>((set: SetState<CoinStore>) => ({
  coinList: [],
  setCoinList: (coinList: any[]) => set((state) => ({ ...state, coinList }))
}));

type CandleData = {
  candle: any[]; // 캔들 데이터 배열
};

type CandleState = {
  candles: Record<string, CandleData>; // ticker를 키로 하는 객체
  setCandles: (ticker: string, data: any[]) => void; // 캔들 데이터 설정 함수
};

export const useCandleStore = create<CandleState>((set) => ({
  candles: {},
  setCandles: (ticker, data) => {
    set((state) => ({
      candles: {
        ...state.candles,
        [ticker]: {
          candle: data
        }
      }
    }));
  }
}));
