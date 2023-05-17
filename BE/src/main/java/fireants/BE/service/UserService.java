package fireants.BE.service;

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

    public String deleteUser(User user) {
        User findUser = userRepository.findByUsername(user.getUsername());
        if (findUser == null)
            return "FAIL_존재하지 않는 아이디";
        userRepository.delete(findUser);
        return "SUCCESS";
    }

    public String updateUser(User user) {
        User findUser = userRepository.findByUsername(user.getUsername());
        if (findUser == null)
            return "FAIL_존재하지 않는 아이디";

        findUser.setPassword(encoder.encode(user.getPassword()));
        findUser.setNickname(user.getNickname());
        userRepository.save(findUser);
        return "SUCCESS";
    }

    public User getUser(User user) {
        return userRepository.findByUsername(user.getUsername());
    }

    public List<Trade> getTrade(User user) {
        return userRepository.findByUsername(user.getUsername()).getTrades();
    }
}
