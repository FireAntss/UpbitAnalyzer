package fireants.BE.service;

import fireants.BE.utils.JwtUtil;
import fireants.BE.domain.Account;
import fireants.BE.domain.User;
import fireants.BE.repository.AccountRepository;
import fireants.BE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    public String createAccount(HttpServletRequest request) {

        String username = JwtUtil.getUsernameByJwt(request);

        User findUser = userRepository.findByUsername(username);
        Account newAccount = new Account().builder()
                .user(findUser)
                .KRW(1000000l)
                .build();

        accountRepository.save(newAccount);
//        findUser.setAccount(newAccount);
        return "SUCCESS";
    }

    public Account getAccount(HttpServletRequest request) {
        String username = JwtUtil.getUsernameByJwt(request);
        User findUser = userRepository.findByUsername(username);

        return accountRepository.findByUser(findUser);
    }
}
