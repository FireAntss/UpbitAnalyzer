package fireants.BE.controller;

import fireants.BE.domain.Account;
import fireants.BE.domain.User;
import fireants.BE.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/createAccount")
    public String createAccount(HttpServletRequest request) {
        return accountService.createAccount(request);
    }

    @GetMapping("/getAccount")
    public Account getAccount(HttpServletRequest request) {
        return accountService.getAccount(request);
    }
}
