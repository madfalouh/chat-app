import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { WEB_SOCKET_URL } from '../constants/apis';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private client: Client;

  constructor() {
    this.client = new Client({
      brokerURL: WEB_SOCKET_URL,
      reconnectDelay: 5000,
    });

    this.client.onConnect = () => {
      console.log('l7wa tkonnectit');
    };


    this.client.onWebSocketError = (error) => {
      console.error(error);
    };

    this.client.activate();
  }
}
