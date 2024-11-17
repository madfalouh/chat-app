package com.example.chatback.requests;

import com.example.chatback.Dtos.MessageDto;
import com.example.chatback.Entities.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.util.Date;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class MessageRequest {
    public MessageDto message;
    public Long chatRoom_id;
}
