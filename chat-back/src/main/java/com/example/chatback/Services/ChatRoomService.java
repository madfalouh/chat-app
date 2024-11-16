package com.example.chatback.Services;

import com.example.chatback.Dtos.ChatRoomDto;
import com.example.chatback.Dtos.MessageDto;
import com.example.chatback.Entities.ChatRoom;
import com.example.chatback.Entities.Message;
import com.example.chatback.Entities.User;
import com.example.chatback.Repositories.ChatRoomRepository;
import com.example.chatback.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Getter
@Setter
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    private final MessageService messageService;

    public List<ChatRoom> findAllByUserId(Long userId) {
        return chatRoomRepository.findChatRoomsByFirst_user_idOrSecond_user_id(userId) ;
    }

    public Optional<ChatRoom> findByID(Long chatRoomId) {
        return chatRoomRepository.findById(chatRoomId) ;
    }

    public List<ChatRoomDto> getChatRoomOfTheUsers(Long userId) {
        List<ChatRoom> chatRooms = findAllByUserId(userId);
        List<ChatRoomDto> chatRoomDtos = new ArrayList<>();

        for (ChatRoom chatRoom : chatRooms) {
            User myFriend = null;

            if (userId.equals(chatRoom.getFirstUserId())) {
                // Im the first id of the chat room my friend is the 2nd id
                myFriend = userRepository.findById(chatRoom.getSecondUserId()).orElse(null);
            } else if (userId.equals(chatRoom.getSecondUserId())) {
                // IIm the second id of the chat room my friend is the 1st id
                myFriend = userRepository.findById(chatRoom.getFirstUserId()).orElse(null);
            }

            if (myFriend != null) {
                // manual mapping to msgDTO
                List<MessageDto> messageDtos = chatRoom.getMessages().stream()
                        .map(message -> new MessageDto(message.getSender_id(), message.getContent()))
                        .toList();

                chatRoomDtos.add(new ChatRoomDto(myFriend.getUsername(), messageDtos));
            }
        }
        return chatRoomDtos;
    }





    public ChatRoom saveChatRoom(Long firstId , Long secondId) throws Exception {
        ChatRoom chatRoom = new ChatRoom() ;
        chatRoom.setFirstUserId(firstId);
        chatRoom.setSecondUserId(secondId);
        return chatRoomRepository.save(chatRoom) ;
    }


    /*
        better save msgs by bulk not by single msg
    */
    public boolean updateChatRoomByMessage(Long chatRoomId, Message newMessage)  {
            try {
                ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).orElseThrow(Exception::new);
                List<Message> newMessages = chatRoom.getMessages();
                newMessages.add(newMessage);
                chatRoom.setMessages(newMessages);
                chatRoomRepository.save(chatRoom);
                return true;
            } catch (Exception e) {
                return false;
            }
        }

    }

