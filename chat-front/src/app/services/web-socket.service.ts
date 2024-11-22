import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { WEB_SOCKET_URL } from '../constants/apis';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: any;

  public currentMessages : any = [];


  private newMessageBehavior = new BehaviorSubject<string>('');

  message$ = this.newMessageBehavior.asObservable() ; 



 private newRequestBehavior = new BehaviorSubject<string>('');

  request$ = this.newRequestBehavior.asObservable() ; 

  private newTypingBehavior = new BehaviorSubject<string>('');
  isTyping$ = this.newTypingBehavior.asObservable() ; 

  private newRequestAcceptedBehavior = new BehaviorSubject<string>('');
  requestAccepted$ = this.newRequestAcceptedBehavior.asObservable() ; 

  connect() : void {
    const username = sessionStorage.getItem("username")
    const socket = new SockJS(WEB_SOCKET_URL + `?username=${username}`);  // Establish a SockJS connection
    this.stompClient = Stomp.over(socket); 

    // Connect to the STOMP endpoint
    this.stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);

      // Subscribe to a topic (e.g., /topic/chat) to listen for messages

     this.stompClient.subscribe('/user/queue/messages', (message: any) => {
      this.newMessageBehavior.next(message)
      });


     this.stompClient.subscribe('/user/queue/request', (request: any) => {
      this.newRequestBehavior.next(request)
      });

      this.stompClient.subscribe('/user/queue/requestAccepted', (request: any) => {
        this.newRequestAcceptedBehavior.next(request)
        });

      this.stompClient.subscribe('/user/queue/typing', (isTyping : any) => {
        this.newTypingBehavior.next(isTyping)
      })
 
    }, (error: any) => {
      console.error('Connection error: ', error);
    })



  }
  


  sendMsg(username : string , content : string) {
    const msg = {
      username : username,
      content : content
    }
    this.stompClient.send("/app/hello", {}, JSON.stringify(msg));
  }


  sendRequest(myname : string , firndsname : string) {
    const req = {
      username : firndsname,
      myname : myname
    }
    this.stompClient.send("/app/send-request", {}, JSON.stringify(req));
  }

  acceptRequest(username : string) {
    const req = {
      friend_name : username
    }
    this.stompClient.send("/app/requestAccepted", {}, JSON.stringify(req));
  }

  sendIsTyping(username : string ,friend : string, isTyping : boolean) {
    const msg = {
      username : username,
      typer : friend,
      isTyping : isTyping
    }
    this.stompClient.send("/app/typing", {}, JSON.stringify(msg));
  }
}
