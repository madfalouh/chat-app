import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId!: string;

  getUserId() : string {
    return this.userId
  }
  setUserId(id : string) : void {
    this.userId = id
  }

  constructor() { }
}
