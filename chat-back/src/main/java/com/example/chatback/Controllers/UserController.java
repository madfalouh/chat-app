package com.example.chatback.Controllers;

import com.example.chatback.Dtos.UserDto;
import com.example.chatback.Entities.User;
import com.example.chatback.Principal.UserPrincipal;
import com.example.chatback.Services.UserService;
import com.example.chatback.requests.UserRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
@Getter
@Setter
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
        public ResponseEntity<User> login(@RequestBody UserRequest userRequest) throws Exception {
        User user = userService.findUserByUsernameAndPassword(userRequest.getUsername(), userRequest.getPassword()).orElseThrow(Exception::new) ;
        UserPrincipal principal = new UserPrincipal(userRequest.getUsername());
        if (user != null) {
            return  ResponseEntity.ok(user) ;
        }else {
            return  ResponseEntity.status(401).body(null) ;
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody UserRequest userRequest) {
            User user = userService.saveUser(userRequest.getUsername(), userRequest.getPassword());
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(400).body(null);
            }
    }


    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> foundUsers(@RequestParam String username) {
        List<UserDto> users = userService.findBySubString(username).orElse(null);
        if (users != null) {
            return ResponseEntity.ok(users);
        }else {
            return ResponseEntity.status(404).body(null);
        }
    }

}
