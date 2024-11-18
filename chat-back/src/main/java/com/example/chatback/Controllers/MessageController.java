package com.example.chatback.Controllers;

import com.example.chatback.Dtos.ChatRoomDto;
import com.example.chatback.Dtos.MessageDto;
import com.example.chatback.Services.ChatRoomService;
import com.example.chatback.Services.MessageService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/message")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
@Getter
@Setter
public class MessageController {

    private final MessageService messageService;
    private final ChatRoomService chatRoomService;

    @GetMapping("/get-messages/{roomId}")
    public ResponseEntity<List<MessageDto>> getMessages(@PathVariable Long roomId ) {
        List<MessageDto>  messages = messageService.getMessagesOfTheChatRoom(roomId);
        if (messages != null && !messages.isEmpty()) {
            return  ResponseEntity.ok(messages) ;
        }else {
            return  ResponseEntity.status(401).body(null) ;
        }
    }

    @PostMapping("/save/{roomId}")
    public ResponseEntity<Boolean> saveMessage(@PathVariable Long roomId , @RequestBody MessageDto messageDto) {
        boolean result = chatRoomService.updateChatRoomByMessage(roomId , messageDto);
        return  result ? ResponseEntity.ok(true) : ResponseEntity.status(401).body(null) ;

    }

}
