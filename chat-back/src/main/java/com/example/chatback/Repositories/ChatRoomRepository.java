package com.example.chatback.Repositories;

import com.example.chatback.Entities.ChatRoom;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {


    @Query("SELECT c FROM ChatRoom c WHERE c.firstUserId = :userId OR c.secondUserId = :userId")
    List<ChatRoom> findChatRoomsByFirst_user_idOrSecond_user_id(@Param("userId") Long userId);

}
