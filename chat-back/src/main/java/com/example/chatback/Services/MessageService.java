package com.example.chatback.Services;

import com.example.chatback.Dtos.MessageDto;
import com.example.chatback.Entities.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Getter
@Setter
public class MessageService {

    public  Message fromDtoToEntity(MessageDto messageDto) {
        if (messageDto == null) {
            throw new RuntimeException("MessageDto cannot be null");
        }

        Message message = new Message();
        message.setContent(messageDto.getContent());
        message.setSender_id(messageDto.getSender_id());
        message.setTimestamp(new Date());

        return message;
    }

    public List<Message> fromDtoEntityList(List<MessageDto> messageDtoList) {
        if (messageDtoList == null) {
            throw new RuntimeException("MessageDtos cannot be null");
        }

        return messageDtoList.stream()
                .map(this::fromDtoToEntity)
                .collect(Collectors.toList());
    }
}
