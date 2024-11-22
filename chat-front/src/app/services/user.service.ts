import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { SEARCH_URL } from '../constants/apis';
import { User } from '../models/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId!: string;
  username! : string;
  friendUsername! : string;

  constructor(private http: HttpClient) {
    
  }

  getUserId() : string {
    return this.userId
  }
  setUserId(id : string) : void {
    this.userId = id
  }

  getUsername() : string {
    return this.username
  }
  setUsername(username : string) : void {
    this.username = username
  }

  getFriendUsername() : string {
    return this.friendUsername
  }
  setFriendUsername(username : string) : void {
    this.friendUsername = username
  }

  searchUser(username: string ): Observable<User[]> {
    return this.http.get<User[]>(SEARCH_URL + `?username=${username}`).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) =>{
          throw err;
        })
    )

  }

}
