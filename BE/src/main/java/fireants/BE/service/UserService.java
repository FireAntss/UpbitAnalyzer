package fireants.BE.service;

import fireants.BE.domain.User;
import fireants.BE.exception.CustomException;
import fireants.BE.exception.ErrorCode;
import fireants.BE.repository.UserRepository;
import fireants.BE.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
            return JwtUtil.createJwt(findUser.getUserName(), secretKey, expiredMs);
        } catch (Exception e) {
            return "USERNAME_FAIL";
        }
    }
}
