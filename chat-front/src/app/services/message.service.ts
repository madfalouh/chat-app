import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { SAVE_MSG_URL } from '../constants/apis';
import { Message } from '../models/message.type';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  saveMessage(chatRoomId : string , message:Message ) : Observable<boolean> {

    return this.http.post<any>(SAVE_MSG_URL + "/" + chatRoomId , message).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) =>{
          throw err;
        })
    )
  }

}
