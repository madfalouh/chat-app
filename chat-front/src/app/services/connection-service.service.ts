import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.type';


@Injectable({
  providedIn: 'root'
})
export class ConnectionServiceService {

  constructor( private http: HttpClient) { }

    
  login(user: User): Observable<User> {

console.log(user);


    return this.http.post<User>('http://localhost:8080/api/v1/user/login', user).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) =>{
          throw err;
        })
    )

  }


}
