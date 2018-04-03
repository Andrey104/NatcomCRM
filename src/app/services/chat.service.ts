import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebsocketService} from './websocket.service';

const CHAT_URL = 'ws://natcom-crm.nextf.ru/ws/connect';

@Injectable()
export class ChatService {
  public messages: Subject<object>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<object>>wsService
      .connect(CHAT_URL)
      .map((response: MessageEvent): object => {
        const data = JSON.parse(response.data);
        return {
          data
        };
      });
  }
}
