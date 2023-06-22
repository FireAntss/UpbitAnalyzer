import { useCoinStore, useCandleStore } from '@stores/CoinStore';
import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

const MAX_CONNECTIONS = 5;
let activeConnections = 0;

let handleOpen: () => void;
let handleMessage: (evt: MessageEvent) => void;
let handleError: (evt: Event) => void;
let handleClose: () => void;

const createSocket = (ticker: string, coinList: any[], setCoinList: (updatedList: any[]) => void) => {
  const ws = new WebSocket('wss://api.upbit.com/websocket/v1');
  ws.binaryType = 'arraybuffer';

  handleOpen = () => {
    ws.send(JSON.stringify([{ ticket: 'fire-ants' }, { type: 'ticker', codes: [ticker] }]));
  };

  handleMessage = (evt: MessageEvent) => {
    const enc = new TextDecoder('utf-8');
    const arr = new Uint8Array(evt.data);
    const data = JSON.parse(enc.decode(arr));
    console.log('Connected CoinList Details Websocket');

    useCoinStore.setState((state) => {
      const updatedCoin = state.coinList.find((coin) => coin.market === data.code);
      if (updatedCoin !== undefined) {
        const updatedList = state.coinList.map((coin) => (coin.market === data.code ? { ...coin, ...data } : coin));
        return { coinList: updatedList };
      }
      return state;
    });
  };

  handleMessage = throttle(handleMessage, 10000); // 1초에 한 번씩만 실행되도록 throttle 적용

  handleError = (evt: Event) => {
    console.error('WebSocket error:', evt);
  };

  handleClose = () => {
    ws.close();
    console.log('WebSocket connection closed.');
  };

  ws.addEventListener('open', handleOpen);
  ws.addEventListener('message', handleMessage);
  ws.addEventListener('error', handleError);
  ws.addEventListener('close', handleClose);

  return ws;
};

const initializeConnections = (
  coinList: any[],
  setCoinList: (updatedList: any[]) => void,
  setConnectionPool: (connections: WebSocket[]) => void
) => {
  const connections: WebSocket[] = [];

  for (let i = 0; i < coinList.length && i < MAX_CONNECTIONS; i++) {
    const ticker = coinList[i].market;
    const ws = createSocket(ticker, coinList, setCoinList);
    connections.push(ws);
    activeConnections++;
  }

  setConnectionPool(connections);
};

const replaceConnection = (
  index: number,
  coinList: any[],
  connectionPool: WebSocket[],
  setCoinList: (updatedList: any[]) => void,
  setConnectionPool: (connections: WebSocket[]) => void
) => {
  if (activeConnections < coinList.length) {
    const ticker = coinList[activeConnections].market;
    const ws = createSocket(ticker, coinList, setCoinList);
    const connections = [...connectionPool];
    connections[index].removeEventListener('open', handleOpen);
    connections[index].removeEventListener('message', handleMessage);
    connections[index].removeEventListener('error', handleError);
    connections[index].removeEventListener('close', handleClose);
    connections[index].close();

    connections[index] = ws;
    setConnectionPool(connections);
    activeConnections++;
  }
};

const closeConnections = (connectionPool: WebSocket[]) => {
  connectionPool.forEach((ws) => {
    ws.removeEventListener('open', handleOpen);
    ws.removeEventListener('message', handleMessage);
    ws.removeEventListener('error', handleError);
    ws.removeEventListener('close', handleClose);

    handleClose();
  });
};

const useWebSocket = () => {
  const coinList = useCoinStore((state) => state.coinList);
  const setCoinList = useCoinStore((state) => state.setCoinList);
  const [connectionPool, setConnectionPool] = useState<WebSocket[]>([]);

  const startWebSocket = () => {
    initializeConnections(coinList, setCoinList, setConnectionPool);
  };

  const stopWebSocket = () => {
    closeConnections(connectionPool);
    setConnectionPool([]); // 연결 풀 초기화
  };

  useEffect(() => {
    return () => {
      stopWebSocket(); // 컴포넌트가 언마운트되면 웹소켓 연결 종료
    };
  }, []);

  return { startWebSocket, stopWebSocket };
};

export default useWebSocket;
