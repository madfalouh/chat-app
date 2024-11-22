package com.example.chatback.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class SocketTypingRequest {
    private String username;
    private String typer;
    private boolean isTyping;
}
