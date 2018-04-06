import {Component} from '@angular/core';
import {WebsocketService} from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  orderId: number;
  showEvent = false;

  constructor(private webSocketService: WebsocketService) {
    this.webSocketService.makeSocketConnection();
  }
}
