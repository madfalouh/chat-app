package com.example.chatback.Controllers;

import com.example.chatback.Dtos.ChatRoomDto;
import com.example.chatback.Dtos.MessageDto;
import com.example.chatback.Entities.Message;
import com.example.chatback.Services.ChatRoomService;
import com.example.chatback.requests.UserRequest;
import com.example.chatback.requests.MessageRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chatroom")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
@Getter
@Setter
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @GetMapping("/rooms/{id}")
    public ResponseEntity<List<ChatRoomDto>> getUserRooms(@PathVariable Long id ) {
        List<ChatRoomDto> chatRooms = chatRoomService.getChatRoomOfTheUsers(id);
        if (chatRooms != null && !chatRooms.isEmpty()) {
            return  ResponseEntity.ok(chatRooms) ;
        }else {
            return  ResponseEntity.status(401).body(null) ;
        }
    }
    // TODO : add websockets
    @PostMapping("/send-message")
    public ResponseEntity<Boolean> sendMessage(@RequestBody MessageRequest messageRequest) {
      if(chatRoomService.updateChatRoomByMessage(messageRequest.chatRoom_id, messageRequest.getMessage())){
          return  ResponseEntity.ok(true) ;
      }
      else{
          return  ResponseEntity.status(401).body(false) ;
      }
    }


    @PostMapping("/create-room")
    public ResponseEntity<Boolean> createRoom(@RequestParam long firstId , @RequestParam long secondId) throws Exception {
        if(chatRoomService.saveChatRoom(firstId , secondId)  !=null ) {
            return  ResponseEntity.ok(true) ;
        }
        else{
            return  ResponseEntity.status(401).body(false) ;
        }
    }

}
