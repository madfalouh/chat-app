package com.example.chatback.Controllers;

import com.example.chatback.Dtos.TyperDto;
import com.example.chatback.requests.AcceptFriendRequest;
import com.example.chatback.requests.SocketFriendRequest;
import com.example.chatback.requests.SocketMessageRequest;
import com.example.chatback.requests.SocketTypingRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class SocketController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/hello")
    public void send(SimpMessageHeaderAccessor sha, @Payload SocketMessageRequest payload) {
        String message = payload.getContent();
        String username = payload.getUsername();
        SocketController.log.debug("my username is " + username);
        simpMessagingTemplate.convertAndSendToUser(username, "/queue/messages", message);
    }

    @MessageMapping("/send-request")
    public void sendRequest(SimpMessageHeaderAccessor sha, @Payload SocketFriendRequest payload) {
        String username = payload.getUsername();
        String myName = payload.getMyname() ;
        SocketController.log.debug("my username is " + username + " my name is " + myName);
        simpMessagingTemplate.convertAndSendToUser(username, "/queue/request", myName);
    }

    @MessageMapping("/requestAccepted")
    public void acceptRequest(SimpMessageHeaderAccessor sha, @Payload AcceptFriendRequest payload) {
        String username = payload.getFriend_name();
        simpMessagingTemplate.convertAndSendToUser(username, "/queue/requestAccepted", true);
    }

    @MessageMapping("/typing")
    public void typing(SimpMessageHeaderAccessor sha, @Payload SocketTypingRequest payload) {
        String username = payload.getUsername();
        TyperDto typerDto = new TyperDto(payload.getTyper(),payload.isTyping());
        simpMessagingTemplate.convertAndSendToUser(username, "/queue/typing", typerDto);
    }
    
}
