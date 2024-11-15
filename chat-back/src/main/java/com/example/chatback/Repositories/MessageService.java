package com.example.chatback.Repositories;

import com.example.chatback.Entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageService extends JpaRepository<Message, Integer> {
}
