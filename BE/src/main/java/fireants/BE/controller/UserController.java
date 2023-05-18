package fireants.BE.controller;

import fireants.BE.domain.User;
import fireants.BE.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/join")
    public String join(@RequestBody User user) {
        return userService.join(user);
    }

    @DeleteMapping("/delete")
    public String deleteMember(@RequestBody User user) {
        return userService.deleteUser(user);
    }

    @PutMapping("/update")
    public String updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @PostMapping("/userInfo")
    public User getUser(@RequestBody User user) {
        return userService.getUser(user);
    }

    @PostMapping("/tradeDetails")
    public List getTrade(@RequestBody User user) {
        return userService.getTrade(user);
    }
}
