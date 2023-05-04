package fireants.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fireants.domain.Candle;
import fireants.persistence.CandleRepository;

@Service
public class CandleService {
    @Autowired
    private CandleRepository candleRepository;

    public void saveCandles(Candle[] candle) throws Exception {
        candleRepository.save(candle[0]);
    }
}
