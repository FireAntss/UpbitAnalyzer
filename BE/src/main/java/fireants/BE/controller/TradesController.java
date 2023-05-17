package fireants.BE.controller;

import fireants.BE.domain.Trade;
import fireants.BE.service.TradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/trade")
public class TradesController {

    @Autowired
    private TradeService tradeService;

    @PostMapping("/buy")
    public String buy(@RequestBody Trade trade, HttpServletRequest req) {
        return tradeService.buy(trade, req);
    }

    @PostMapping("/sell")
    public String sell(@RequestBody Trade trade, HttpServletRequest req) {
        return tradeService.buy(trade, req);
    }
}
