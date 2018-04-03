import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';
import {WebsocketService} from './websocket.service';

const CHAT_URL = 'ws://natcom-crm.nextf.ru/ws/connect';

@Injectable()
export class ChatService {
  public messages: Subject<object>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<object>>wsService
      .connect(CHAT_URL)
      .map((response: MessageEvent): object => {
        let data = JSON.parse(response.data);
        return {
          data
        };
      });
  }
}
