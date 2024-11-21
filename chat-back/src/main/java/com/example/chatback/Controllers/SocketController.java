package com.example.chatback.Controllers;

import com.example.chatback.requests.SocketMessageRequest;
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

    
}
