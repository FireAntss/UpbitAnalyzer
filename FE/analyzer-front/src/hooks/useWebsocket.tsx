import useWebSocket from '@utils/websocket';
import { useState, useEffect } from 'react';

const useWebSocketDetails = () => {
  const [isFetched, setIsFetched] = useState(true);
  const { startWebSocket, stopWebSocket } = useWebSocket();

  useEffect(() => {
    if (isFetched) {
      startWebSocket();
    } else {
      stopWebSocket();
    }

    return () => {
      console.log('Disconnected CoinList Details Websocket');
      stopWebSocket();
    };
  }, [isFetched]);

  return { setIsFetched };
};

export default useWebSocketDetails;
