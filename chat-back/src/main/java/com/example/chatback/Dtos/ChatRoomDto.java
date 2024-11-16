package com.example.chatback.Dtos;

import com.example.chatback.Entities.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChatRoomDto {
    private String friend_username;
    private List<MessageDto> messages;


}
