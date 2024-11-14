package com.example.chatback.Entities;

import com.example.chatback.Dtos.MessageDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long first_user_id;
    private Long second_user_id;
    @OneToMany(mappedBy = "chatRoom")
    private List<Message> messages;

}
