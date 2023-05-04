package fireants.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import fireants.domain.Candle;
import fireants.service.CandleService;

@Component
public class CandleScheduler {
	
    private final CandleService candleService;    
    
    @Autowired
    public CandleScheduler(CandleService candleService) {
    	this.candleService = candleService;    	
	}

    @Scheduled(fixedDelay = 60 * 60 * 1000) // 단위 : ms 1시간 마다..
    public void updateCandles() throws Exception {
    	RestTemplate restTemplate = new RestTemplate();
    	restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
    	String apiUrl = "https://api.upbit.com/v1/candles/minutes/60?market=KRW-BTC";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);        
        Candle[] response = restTemplate.getForObject(apiUrl, Candle[].class);
        
        
        candleService.saveCandles(response);
    }
}
