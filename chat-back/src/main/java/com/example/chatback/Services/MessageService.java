package com.example.chatback.Services;

import com.example.chatback.Dtos.MessageDto;
import com.example.chatback.Entities.ChatRoom;
import com.example.chatback.Entities.Message;
import com.example.chatback.Repositories.ChatRoomRepository;
import com.example.chatback.Repositories.MessageRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Getter
@Setter
public class MessageService {

    private final MessageRepository messageRepository;
    private final ChatRoomRepository chatRoomRepository;
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


    public MessageDto fromEntityToDto(Message message) {

        if(message == null) {
            throw new RuntimeException("Message cannot be null");
        }
        MessageDto messageDto = new MessageDto();
        messageDto.setContent(message.getContent());
        messageDto.setSender_id(message.getSender_id());
        return messageDto;
    }

    public Message save(Message message) {
        if (message == null) {
            throw new RuntimeException("Message cannot be null");
        }
        return messageRepository.save(message);
    }


    public List<MessageDto> getMessagesOfTheChatRoom (Long chatRoomId) {
        if (chatRoomId == null) {
            throw new RuntimeException("ChatRoomId cannot be null");
        }
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).orElse(null);
        if (chatRoom == null) {
            throw new RuntimeException("ChatRoom not found");
        }

        List<MessageDto> messageDtos = new ArrayList<>();

        for (Message message : chatRoom.getMessages()) {

            messageDtos.add(fromEntityToDto(message));

        }

        return messageDtos;
    }


}
