import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../../models/message.type';
import { User } from '../../models/user.type';
import { ChatRoomService } from '../../services/chat-room.service';
import { MessageService } from '../../services/message.service';
import { WebSocketService } from '../../services/web-socket.service';
import { ChatRoom } from './../../models/chatRoom.type';
import { UserService } from './../../services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  chatRooms: Array<ChatRoom> = [];
  
  messages: Array<Message> = [] ;

  searchResult:  Array<User> = [] 



  showresults: boolean = false

  @ViewChild('SearchInput') searchInput!: ElementRef;


  constructor(private chatRoomService: ChatRoomService,
    private userService: UserService,
    private webSocketService: WebSocketService,
    private router: Router ,
    private messageService : MessageService)
   { }


  ngOnInit(): void {
    this.getChatrooms();
    this.getMessages();
  }


  getUserId() {
    return this.userService.getUserId() ? this.userService.getUserId() : sessionStorage.getItem("id");
  }

  signOff(): void {
      sessionStorage.clear();
      this.router.navigate(["/login"])
  }

  getChatrooms() {
    const id = this.getUserId();
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

  getMessages() {
    const id = this.getIdChatRoom() || sessionStorage.getItem('idChatRoom')
    if (!id) {
      console.log("m outtt",id)
      return}
    this.chatRoomService.getMessages(id).subscribe((res: Array<Message>) => {
      console.log(res);
      if (res) {
        this.messages = res;
      } else {
        console.log("ser t7wa");
      }
    }
    )
  }

  setChatRoom(id: string) {
    sessionStorage.setItem("idChatRoom", id);
    this.chatRoomService.setIdChatRoom(id);
    this.getMessages();
  }

  getIdChatRoom() {
    return this.chatRoomService.getIdChatRoom() || sessionStorage.getItem('idChatRoom') ;
  }



  send(event: any, content: string) {
    event.preventDefault();
    const id = this.getIdChatRoom();
    const userId = this.getUserId();
    if (!userId || !id || !content) return;
    const message: Message = {
      sender_id: userId,
      content: content,
    }
    this.messageService.saveMessage(id, message).subscribe((res: boolean) => {
      if (res) {
        // TODO   
      } else {
        console.log(" ser t7wa ");

      }
    });
  }


  search(event: any) {

    if (event.target.value && event.target.value.trim() != '') {
      this.userService.searchUser(event.target.value).subscribe((res : Array<User>) => {
        if (res) {
          this.searchResult = res;
          this.showresults = true ;
        } else {
          console.log('ser t7wa');

        }

      })

    } else if (event.target.value.trim() == '' && this.searchResult.length > 0) {
      this.searchResult = []
    }



  }


  selectUser(user: User) {
    this.searchInput.nativeElement.value = user.username
    this.showresults = false ;
  }

}
