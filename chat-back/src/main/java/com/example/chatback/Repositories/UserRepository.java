package com.example.chatback.Repositories;


import com.example.chatback.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsernameAndPassword(String username, String password);

    Optional<User>  findUserById (Long id);

    @Query("select u from User u where u.username Like %:username% ")
    Optional<List<User>>  findUserByName (@Param("username") String username);

    @Query("SELECT u FROM User u WHERE u.username = :name")
    Optional<User> findUserByUserName(@Param("name") String name);

}
