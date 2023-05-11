package fireants.BE.service;

import fireants.BE.configuration.security.JwtTokenProvider;
import fireants.BE.domain.Trade;
import fireants.BE.domain.User;
import fireants.BE.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    @Value("${jwt.secret}")
    private String secretKey;

    private Long expiredMs = 1000 * 60 * 60l;

    public String join(User user) {
        // userName 중복 체크
        try {
            User findUser = userRepository.findByUserName(user.getUserName()).get();
            return "DUPLICATED_FAIL";
        } catch (Exception e) {
            // 저장
            user.setRole("MEMBER");
            user.setPassword(encoder.encode(user.getPassword()));
            userRepository.save(user);
        }
        return "SUCCESS";
    }

    public String login(User user) {
        // 인증과정
        try {
            User findUser = userRepository.findByUserName(user.getUserName()).get();
            if (!encoder.matches(user.getPassword(), findUser.getPassword())) {
                return "PASSWORD_FAIL";
            }
            return JwtTokenProvider.createToken(findUser.getUserName(), secretKey, expiredMs);
        } catch (Exception e) {
            return "USERNAME_FAIL";
        }
    }

    public String deleteUser(String userName) {
        try {
            User findUser = userRepository.findByUserName(userName).get();
            userRepository.delete(findUser);
            return "SUCCESS";
        } catch (Exception e) {
            return "FAIL";
        }
    }

    public String updateUser(String userName, User user) {
        try {
            User findUser = userRepository.findByUserName(userName).orElseThrow(() -> new Exception("User not found"));
            findUser.setPassword(encoder.encode(user.getPassword()));
            findUser.setNickname(user.getNickname());
            userRepository.save(findUser);
            return "SUCCESS";
        } catch (Exception e) {
            return "FAIL";
        }
    }

    public User getUser(String userName) {
        return userRepository.findByUserName(userName).get();
    }

    public List<Trade> getTrade(String userName) {
        return userRepository.findByUserName(userName).get().getTrades();
    }
}
