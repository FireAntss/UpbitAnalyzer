package fireants.BE.controller;

import fireants.BE.domain.User;
import fireants.BE.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody User user) {
        return ResponseEntity.ok().body(userService.join(user));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        return ResponseEntity.ok().body(userService.login(user));
    }

    @DeleteMapping("/{userName}")
    public ResponseEntity<String> deleteMember(@PathVariable("userName") String userName) {
        return ResponseEntity.ok().body(userService.deleteUser(userName));
    }

    @PutMapping("/{userName}")
    public ResponseEntity<String> updateUser(@PathVariable("userName") String userName, @RequestBody User user) {
        return ResponseEntity.ok().body(userService.updateUser(userName, user));
    }

    @GetMapping("/{userName}/userInfo")
    public ResponseEntity<User> getUser(@PathVariable("userName") String userName) {
        return ResponseEntity.ok().body(userService.getUser(userName));
    }

    @GetMapping("/{userName}/tradeDetails")
    public ResponseEntity<List> getTrade(@PathVariable("userName") String userName) {
        return ResponseEntity.ok().body(userService.getTrade(userName));
    }
}
