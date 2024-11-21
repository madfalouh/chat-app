import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../../models/message.type';
import { User } from '../../models/user.type';
import { ChatRoomService } from '../../services/chat-room.service';
import { MessageService } from '../../services/message.service';
import { WebSocketService } from '../../services/web-socket.service';
import { ChatRoom } from './../../models/chatRoom.type';
import { UserService } from './../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FriendRequestModalComponent } from '../../modals/friend-request-modal/friend-request-modal.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  chatRooms: Array<ChatRoom> = [];

  messages: Array<Message> = [];

  searchResult: Array<User> = []

  selecttedUser!: string;

  showresults: boolean = false

  @ViewChild('SearchInput') searchInput!: ElementRef;


  constructor(private chatRoomService: ChatRoomService,
    private userService: UserService,
    private webSocketService: WebSocketService,
    private router: Router,
    private messageService: MessageService,
    private modalService: ModalService
  ) { }


  ngOnInit(): void {
    this.webSocketService.connect()
    this.webSocketService.message$.subscribe((message: any) => {
      if (!message?.body) return
      const msg = {
        content: message.body,
        sender_id: "0"
      }
      this.messages.push(msg);
    })

    this.webSocketService.request$.subscribe((req: any) => {
      console.log(req);

      if (req && req.body && req.body.trim() !== '') {
        this.openFriendRequest(req.body)

      }
    })

    this.getChatrooms();
    this.getMessages();


  }


  getUserId() {
    return this.userService.getUserId() ? this.userService.getUserId() : sessionStorage.getItem("id");
  }


  getUserName() {
    return this.userService.getUsername() ? this.userService.getUsername() : sessionStorage.getItem("username");
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
      console.log("m outtt", id)
      return
    }
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

  setChatRoom(id: string, friend_username: string) {
    sessionStorage.setItem("idChatRoom", id);
    sessionStorage.setItem("friend_username", friend_username);
    this.chatRoomService.setIdChatRoom(id);
    this.getMessages();
  }

  getIdChatRoom() {
    return this.chatRoomService.getIdChatRoom() || sessionStorage.getItem('idChatRoom');
  }



  // send(event: any, content: string) {
  //   event.preventDefault();
  //   const id = this.getIdChatRoom();
  //   const userId = this.getUserId();
  //   if (!userId || !id || !content) return;
  //   const message: Message = {
  //     sender_id: userId,
  //     content: content,
  //   }
  //   this.messageService.saveMessage(id, message).subscribe((res: boolean) => {
  //     if (res) {
  //       // TODO   
  //     } else {
  //       console.log(" ser t7wa ");

  //     }
  //   });
  // }

  send(event: any, message: string) {
    event.preventDefault();
    const username = sessionStorage.getItem("friend_username");
    const content = message.trim()
    const id = this.getUserId();
    const roomId = this.getIdChatRoom();
    if (!username || !content || !id || !roomId) return
    this.webSocketService.sendMsg(username, content)
    const msgDTO = {
      sender_id: id,
      content: content
    }
    this.messages.push(msgDTO)
    this.messageService.saveMessage(roomId, msgDTO).subscribe((res) => {
      console.log("message saved to DB")
    });
  }


  search(event: any) {

    if (event.target.value && event.target.value.trim() != '') {
      this.userService.searchUser(event.target.value).subscribe((res: Array<User>) => {
        if (res) {
          this.searchResult = res;
          this.showresults = true;
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
    this.showresults = false;
    this.selecttedUser = user.username;
  }

  openFriendRequest(usr: string) {

    if (!this.modalService.modalisOpen) {
      this.modalService.openModal(usr).then(
        (result) => {
          this.chatRoomService.saveChatRoom(usr, this.getUserName()!).subscribe((res) => {
            this.modalService.modalisOpen = false;
            console.log(res);
 
          },
            (err) => {
              console.log(err);
              
              this.modalService.modalisOpen = false;

            }
          )

        }
      );

    }
  }


  sendRequest($event: any) {
    event?.preventDefault();

    this.webSocketService.sendRequest(this.getUserName()!, this.selecttedUser);

  }

}
