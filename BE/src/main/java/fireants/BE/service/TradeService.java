package fireants.BE.service;

import fireants.BE.domain.Trade;
import fireants.BE.domain.User;
import fireants.BE.repository.TradeRepository;
import fireants.BE.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
public class TradeService {

    private final TradeRepository tradeRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    @Value("${jwt.secret}")
    private String secretKey;

    public String buy(Trade trade, HttpServletRequest request) {
        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        String token = authorization.split(" ")[1];
        String userName = JwtUtil.getUserName(token, secretKey);
        try {
            User findUser = userRepository.findByUserName(userName).get();
            trade.setUser(findUser);
            tradeRepository.save(trade);
            return "SUCCESS";
        } catch (Exception e) {
            return "FAIL";
        }
    }

    public String sell(Trade trade, HttpServletRequest request) {
        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        String token = authorization.split(" ")[1];
        String userName = JwtUtil.getUserName(token, secretKey);
        try {
            User findUser = userRepository.findByUserName(userName).get();
            trade.setUser(findUser);
            tradeRepository.save(trade);
            return "SUCCESS";
        } catch (Exception e) {
            return "FAIL";
        }
    }
}
