package com.example.chatback.requests;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AcceptFriendRequest {
    private String friend_name;
}
