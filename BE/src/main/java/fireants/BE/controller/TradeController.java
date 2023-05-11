package fireants.BE.controller;

import fireants.BE.domain.Trade;
import fireants.BE.service.TradeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/trade")
@RequiredArgsConstructor
public class TradeController {

    private final TradeService tradeService;

    @PostMapping("/buy")
    public ResponseEntity<String> buy(@RequestBody Trade trade, HttpServletRequest request) {

        return ResponseEntity.ok().body(tradeService.buy(trade, request));
    }

    @PostMapping("/sell")
    public ResponseEntity<String> sell(@RequestBody Trade trade, HttpServletRequest request) {

        return ResponseEntity.ok().body(tradeService.buy(trade, request));
    }


}
