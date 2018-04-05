import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {WebsocketService} from './websocket.service';

const URL = 'ws://188.225.46.31/ws/connect';

@Injectable()
export class ChatService {
  public messages: Subject<object>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<object>>wsService
      .connect(URL)
      .map((response: MessageEvent): object => {
        const data = JSON.parse(response.data);
        return {
          data
        };
      });
    setTimeout(() => {
      this.sendMsg();
    });
  }

  message = {
    event: 'auth',
    data: {
      token: localStorage.getItem('token')
    }
  };

  sendMsg() {
    console.log('new message from client to websocket: ', this.message);
    this.messages.next(this.message);
  }

}
