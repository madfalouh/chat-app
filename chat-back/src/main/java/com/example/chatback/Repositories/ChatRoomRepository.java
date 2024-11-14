package com.example.chatback.Repositories;

import com.example.chatback.Entities.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    List<ChatRoom> findChatRoomsByFirst_user_idOrSecond_user_id(Long userId);

}
