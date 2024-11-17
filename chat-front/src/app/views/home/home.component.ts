import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from '../../services/chat-room.service';
import { ChatRoom } from './../../models/chatRoom.type';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  chatRooms : Array<ChatRoom> = [];

  constructor(private chatRoomService : ChatRoomService, 
    private userService : UserService ,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getChatrooms();
  }

  signOff() : void {
    sessionStorage.removeItem("id"),
    this.router.navigate(["/login"])
  }

  getChatrooms() {
    const id = this.userService.getUserId() ? this.userService.getUserId() : sessionStorage.getItem("id");
    if (!id) return
    this.chatRoomService.getFriends(id).subscribe((res: Array<ChatRoom>) => {
      console.log(res);
      if (res) {
        this.chatRooms = res;
      } else {
        console.log("ser t7wa");
      }
      }
    )
  }
}
