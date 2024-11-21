package com.example.chatback.Principal;

import lombok.AllArgsConstructor;
import lombok.Setter;

import java.security.Principal;

@Setter
public class UserPrincipal implements Principal {

    private String name;

    public UserPrincipal(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return name;
    }
}
