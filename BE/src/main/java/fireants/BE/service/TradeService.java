package fireants.BE.service;

import fireants.BE.domain.Trade;
import fireants.BE.domain.User;
import fireants.BE.repository.TradeRepository;
import fireants.BE.repository.UserRepository;
import fireants.BE.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Service
public class TradeService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TradeRepository tradeRepository;

    public String buy(Trade trade, HttpServletRequest request) {

        String username = JwtUtil.getUsernameByJwt(request);
        User user = userRepository.findByUsername(username);

        if (user == null)
            return "FAIL";

        trade.setUser(user);
        trade.setTradeType("buy");
        trade.setMarket(trade.getMarket());
        trade.setTransactionTime(new Date());
//        trade.setTransactionUnitPrice(trade.getTransactionUnitPrice());
//        trade.setVolume();
//        trade.setTotalPrice();
//        trade.setFee(0.05*);
        tradeRepository.save(trade);
        return "SUCCESS";
    }

    public String sell(Trade trade, HttpServletRequest request) {

        String username = JwtUtil.getUsernameByJwt(request);
        User user = userRepository.findByUsername(username);

        if (user == null)
            return "FAIL";

        trade.setUser(user);
        trade.setTradeType("sell");
        trade.setMarket(trade.getMarket());
        trade.setTransactionTime(new Date());
//        trade.setTransactionUnitPrice(trade.getTransactionUnitPrice());
//        trade.setVolume();
//        trade.setTotalPrice();
//        trade.setFee(0.05*);
        tradeRepository.save(trade);
        return "SUCCESS";
    }
}
