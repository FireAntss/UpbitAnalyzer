package fireants;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import fireants.domain.Member;
import fireants.domain.Trade;
import fireants.persistence.CandleRepository;
import fireants.persistence.MemberRepository;
import fireants.persistence.TradeRepository;


@SpringBootTest
class BeApplicationTests {
	
	@Autowired
	private MemberRepository memberRepo; 	
	
	@Autowired
    private CandleRepository candleRepo;
	
	@Autowired
	private TradeRepository tradeRepo;
	
	//@Test
	void addMember() {
		memberRepo.save(new Member().builder()
				.userId("abcd")
				.password("1234")
				.nickname("aa")
				.role("member")
				.KRW(100000000L)
				.build());
	}
	
	@Test 
	void addTrade() {
		tradeRepo.save(new Trade().builder()
				.transactionPrice(12312.0)
				.volume(1111.0)
				.member(memberRepo.findById("yh").get()).build());
	}

}
