import {Injectable} from '@angular/core';
import {ChatService} from './chat.service';

@Injectable()
export class ParseWebsocketService {

  constructor() {
  }

  parseEvent(msg) {
    console.log(msg);
    switch (msg.data.event) {
      case 'on_comment_measurement': {
        console.log('measurement -' + msg.data.data.comment);
        break;
      }
      case 'on_comment_deal': {
        console.log('deal -' + msg.data.data.comment);
        break;
      }
      case 'on_comment_mount': {
        console.log('mount -' + msg.data.data.comment);
        break;
      }
    }
  }
}
