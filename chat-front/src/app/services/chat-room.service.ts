import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { ChatRoom } from '../models/chatRoom.type';
import { GET_CHATROOMS_URL } from '../constants/apis';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  constructor(private http: HttpClient) { }

  getFriends(userId : string) : Observable<Array<ChatRoom>> {
    return this.http.get<Array<ChatRoom>>(GET_CHATROOMS_URL + "/" + userId).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) =>{
          throw err;
        })
    )
  }
}
