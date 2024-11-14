package com.example.chatback.Controllers;

import com.example.chatback.Entities.User;
import com.example.chatback.Services.UserService;
import com.example.chatback.requests.UserRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@AllArgsConstructor
@Getter
@Setter
public class UserController {


    private final UserService userService;

    @PostMapping("/login")
        public ResponseEntity<User> login(@RequestBody UserRequest userRequest) throws Exception {
        User user = userService.findUserByUsernameAndPassword(userRequest.getName(), userRequest.getPassword()).orElseThrow(Exception::new) ;
        if (user != null) {
            return  ResponseEntity.ok(user) ;
        }else {
            return  ResponseEntity.status(401).body(null) ;
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody UserRequest userRequest) {
            User user = userService.saveUser(userRequest.getName(), userRequest.getPassword());
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(400).body(null);
            }
    }



}
