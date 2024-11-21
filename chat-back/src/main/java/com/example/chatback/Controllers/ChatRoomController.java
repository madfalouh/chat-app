package com.example.chatback.Controllers;

import com.example.chatback.Dtos.ChatRoomDto;
import com.example.chatback.Dtos.MessageDto;
import com.example.chatback.Entities.ChatRoom;
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

    @GetMapping("/all/{id}")
    public ResponseEntity<List<ChatRoomDto>> getUserRooms(@PathVariable Long id ) {
        List<ChatRoomDto> chatRooms = chatRoomService.getChatRoomOfTheUsers(id);
        if (chatRooms != null && !chatRooms.isEmpty()) {
            return  ResponseEntity.ok(chatRooms) ;
        }else {
            return  ResponseEntity.status(401).body(null) ;
        }
    }


    @PostMapping("/create")
    public ResponseEntity<Boolean> createRoom(@RequestParam long firstId , @RequestParam long secondId) throws Exception {
        if(chatRoomService.saveChatRoom(firstId , secondId)  !=null ) {
            return  ResponseEntity.ok(true) ;
        }
        else{
            return  ResponseEntity.status(401).body(false) ;
        }
    }


    @PostMapping("/create-by-name")
    public ResponseEntity<ChatRoom> createRoom(@RequestParam String username1 , @RequestParam String username2) throws Exception {
        ChatRoom chatRoom = chatRoomService.saveChatRoom(username1 , username2) ;
        if(chatRoom !=null ) {
            return  ResponseEntity.ok(chatRoom) ;
        }
        else{
            return  ResponseEntity.status(401).body(null) ;
        }
    }
}
