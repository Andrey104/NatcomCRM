import {Injectable} from '@angular/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class WebsocketService {
  authMessage = {
    event: 'auth',
    data: {
      token: localStorage.getItem('token')
    }
  };


  message = new Subject<{ event, data }>();


  constructor() {
  }

  makeSocketConnection() {
    const ws = new $WebSocket('ws://188.225.46.31/ws/connect', [], {
      initialTimeout: 500,
      maxTimeout: 300000,
      reconnectIfNotNormalClose: true
    });
    ws.onOpen(() => {
      console.log('onClose');
      ws.send(this.authMessage).subscribe(
        (msg) => {
          console.log('next', msg.data);
        },
        (msg) => {
          console.log('error', msg);
        },
        () => {
          console.log('complete');
        }
      );
    });
    ws.onClose(() => {
      console.log('onClose');
    });
    ws.onMessage((msg: MessageEvent) => {
      this.message.next(JSON.parse(msg.data));
    });
    return ws;
  }
}
