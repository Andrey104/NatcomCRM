import {Component} from '@angular/core';
import {ChatService} from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  orderId: number;
  showEvent = false;

  constructor(private chatService: ChatService) {
    setTimeout(() => this.chatService.messages.subscribe(msg => {
      console.log(msg);
      this.parseEvent(msg);
    }), 5000);
  }

  parseEvent(msg) {
    if (msg.data.event === 'on_create_order') {
      console.log('app.component ' + msg.data);
      this.orderId = msg.data.data.order_id;
      this.showEvent = true;
    }
  }
}
