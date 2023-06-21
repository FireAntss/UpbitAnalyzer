package fireants.BE.controller;

import fireants.BE.domain.User;
import fireants.BE.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
    public String deleteMember(HttpServletRequest request) {
        return userService.deleteUser(request);
    }

    @PutMapping("/update")
    public String updateUser(@RequestBody User user, HttpServletRequest request) {
        return userService.updateUser(user, request);
    }

    @PostMapping("/userInfo")
    public User getUser(HttpServletRequest request) {
        return userService.getUser(request);
    }

    @PostMapping("/tradeDetails")
    public List getTrade(HttpServletRequest request, @RequestParam String current) {
        return userService.getTrade(request, current);
    }
}
