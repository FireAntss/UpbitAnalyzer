package fireants.BE.service;

import fireants.BE.utils.JwtUtil;
import fireants.BE.domain.Trade;
import fireants.BE.domain.User;
import fireants.BE.repository.TradeRepository;
import fireants.BE.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TradeRepository tradeRepository;
    private final BCryptPasswordEncoder encoder;

    public String join(User user) {
        // userName 중복 체크
        User findUser = userRepository.findByUsername(user.getUsername());
        if (findUser != null)
            return "DUPLICATED_FAIL";

        // 저장
        user.setRole("ROLE_MEMBER");
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
        return "SUCCESS";
    }

    public String deleteUser(HttpServletRequest request) {
        String username = JwtUtil.getUsernameByJwt(request);

        User findUser = userRepository.findByUsername(username);
        if (findUser == null)
            return "FAIL_존재하지 않는 아이디";
        userRepository.delete(findUser);
        return "SUCCESS";
    }

    public String updateUser(User user, HttpServletRequest request) {
        String username = JwtUtil.getUsernameByJwt(request);

        User findUser = userRepository.findByUsername(username);
        if (findUser == null)
            return "FAIL_존재하지 않는 아이디";

        findUser.setPassword(encoder.encode(user.getPassword()));
        findUser.setNickname(user.getNickname());
        userRepository.save(findUser);
        return "SUCCESS";
    }

    public User getUser(HttpServletRequest request) {
        String username = JwtUtil.getUsernameByJwt(request);
        System.out.println(userRepository.findByUsername(username).toString());
        return userRepository.findByUsername(username);
    }

    public List<Trade> getTrade(HttpServletRequest request, String current) {
        String username = JwtUtil.getUsernameByJwt(request);
        User user = userRepository.findByUsername(username);

        if (current.equals("true"))
            return tradeRepository.findTop5ByUserOrderByTradeIdDesc(user);

        return user.getTrades();
    }
}
