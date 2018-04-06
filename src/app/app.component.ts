import {Component} from '@angular/core';
import {WebsocketService} from './services/websocket.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  orderId: number;
  showEvent = false;
  subOnWebSocket: Subscription;

  constructor(private webSocketService: WebsocketService) {
    this.webSocketService.makeSocketConnection();
    this.subOnWebSocket = this.webSocketService.message.subscribe((response) => {
      if (response.event === 'on_create_order') {
        this.orderId = response.data.order_id;
        this.showEvent = true;
      }
    });
  }
}
