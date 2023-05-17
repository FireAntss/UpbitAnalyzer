package fireants.BE.service;

import fireants.BE.domain.User;
import fireants.BE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    public String login(User user) {
        User findUser = userRepository.findByUsername(user.getUsername());
        if (findUser == null)
            return "USERNAME_FAIL";

        if (!encoder.matches(user.getPassword(), findUser.getPassword())) {
            return "PASSWORD_FAIL";
        }

        return "SUCCESS";
    }
}
