package fireants.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import fireants.domain.Member;
import fireants.domain.Trade;
import fireants.service.TradeService;

@RestController
public class TradeController {
	
	private final TradeService tradeService;
	
	@Autowired
	public TradeController(TradeService tradeService) {
		this.tradeService = tradeService;
	}
	
	@PostMapping("api/trade/buy")
	public void buy(@ModelAttribute("member") Member member, @RequestBody Trade trade) {
		tradeService.buy(member, trade);
	}
	
	@PostMapping("api/trade/sell")
	public void sell(@ModelAttribute("member") Member member, @RequestBody Trade trade) {
		tradeService.sell(member, trade);
	}
}
