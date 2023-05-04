package fireants.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;

import fireants.domain.Member;
import fireants.domain.Trade;
import fireants.persistence.CandleRepository;
import fireants.persistence.MemberRepository;
import fireants.persistence.TradeRepository;

@Service
public class TradeService {
	
	private final TradeRepository tradeRepo;
	private final CandleRepository candleRepo;
	private final MemberRepository memberRepo;
	
	@Autowired
	public TradeService(TradeRepository tradeRepo, CandleRepository candleRepo, MemberRepository memberRepo) {
		this.tradeRepo = tradeRepo;
		this.candleRepo = candleRepo;
		this.memberRepo = memberRepo;
	}
	
	public void buy(Member member, Trade trade) {
		Double fee = trade.getTransactionPrice()*0.05;
		Date now = new Date();
		//Double volume = candleRepo.findByCandle_date_time_kst(now);
		
		trade.setTransactionTime(now);
		trade.setStart("KRW");
		trade.setEnd("BTC");
		//trade.setVolume(volume);
		trade.setFee(fee);
		trade.setMember(memberRepo.findById("kim").get());
		
		tradeRepo.save(trade);
	}
	
	public void sell(Member member, Trade trade) {
		Double fee = trade.getTransactionPrice()*0.05;
		Date now = new Date();
		//Double volume = candleRepo.findByCandle_date_time_kst(now);
		
		trade.setTransactionTime(now);
		trade.setStart("BTC");
		trade.setEnd("KRW");
		//trade.setVolume(volume);
		trade.setFee(fee);
		trade.setMember(memberRepo.findById("kim").get());
		
		tradeRepo.save(trade);
	}
}
