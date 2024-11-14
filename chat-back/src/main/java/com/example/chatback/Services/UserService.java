package com.example.chatback.Services;

import com.example.chatback.Entities.User;
import com.example.chatback.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
@Getter
@Setter
public class UserService {


   private final UserRepository userRepository;

    public Optional<User> findUserByUsernameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username , password);
    }



    public User saveUser(String name, String password) {
        User user = new User(null, name, password);
        return userRepository.save(user);
    }

}
