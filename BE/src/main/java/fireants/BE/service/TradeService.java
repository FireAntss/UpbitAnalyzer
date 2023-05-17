package fireants.BE.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import fireants.BE.configuration.jwt.JwtProperties;
import fireants.BE.domain.Trade;
import fireants.BE.domain.User;
import fireants.BE.repository.TradeRepository;
import fireants.BE.repository.UserRepository;
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

    public String buy(Trade trade, HttpServletRequest req) {
        String authorization = req.getHeader("Authorization");
        String jwtToken = authorization.replace("Bearer ", "");
        String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("username").asString();

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

    public String sell(Trade trade, HttpServletRequest req) {
        String authorization = req.getHeader("Authorization");
        String jwtToken = authorization.replace("Bearer ", "");
        String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("username").asString();

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
