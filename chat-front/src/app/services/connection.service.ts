import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.type';
import { LOGIN_URL } from '../constants/apis';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor( private http: HttpClient) { }

    
  login(user: User): Observable<User> {
    return this.http.post<User>(LOGIN_URL, user).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) =>{
          throw err;
        })
    )

  }


}
