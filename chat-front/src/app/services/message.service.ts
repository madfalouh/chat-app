import { Injectable } from '@angular/core';
import { Message } from '../models/message.type';
import { catchError, map, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GET_MESSAGES_URL } from '../constants/apis';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  saveMessage(chatRoomId : string , message:Message ) : Observable<boolean> {

    return this.http.post<any>(GET_MESSAGES_URL + "/" + chatRoomId , message).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) =>{
          throw err;
        })
    )
  }

}
