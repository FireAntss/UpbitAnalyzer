package fireants.BE.controller;

import fireants.BE.domain.User;
import fireants.BE.service.LoginService;
import fireants.BE.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        return loginService.login(user);
    }
}
