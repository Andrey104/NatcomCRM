import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {UtilsService} from '../../services/utils.service';
import {OrderAction} from '../../models/orders/order_action';
import {ActivatedRoute} from '@angular/router';
import {OrderResult} from '../../models/orders/order_result';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {WebsocketService} from '../../services/websocket.service';
import {DealResult} from '../../models/deal/deal_result';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(private orderService: OrderService,
              private utils: UtilsService,
              private activatedRoute: ActivatedRoute,
              private webSocketService: WebsocketService) {
  }

  private id: number;
  ws;
  order: OrderResult;
  loader: boolean;
  showDialogReject = false;
  showDialogDefer = false;
  confirmModal = {showConfirmDialog: false, confirmMessage: 'Вы уверены, что хотите перенести данную заявку из отклонненых в текущие?'};
  needSubscribe = true;
  updateList: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  ngOnInit() {
    this.subscribeOrderId();
    this.webSocketService.message.subscribe((response) => {
      switch (response.event) {
        case 'on_reject_order': {
          if (Number(response.data.order_id) === this.order.id) {
            this.orderService.getOrderById(this.order.id)
              .subscribe((result) => {
                this.order = result;
              });
          }
          break;
        }
        case 'on_defer_order': {
          if (Number(response.data.order_id) === this.order.id) {
            this.orderService.getOrderById(this.order.id)
              .subscribe((result) => {
                this.order = result;
              });
          }
          break;
        }
        case 'on_return_order': {
          if (Number(response.data.order_id) === this.order.id) {
            this.orderService.getOrderById(this.order.id)
              .subscribe((result) => {
                this.order = result;
              });
          }
          break;
        }
        case 'on_create_deal': {
          if (Number(response.data.order_id) === this.order.id) {
            this.orderService.getOrderById(this.order.id)
              .subscribe((result) => {
                this.order = result;
              });
          }
          break;
        }
      }
    });
  }

  subscribeOrderId(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.loader = true;
      this.orderService.getOrderById(this.id)
        .subscribe(order => {
          this.order = order;
          this.loader = false;
        });
    });
  }

  successUpdate(order) {
    this.order = order;
    this.updateList.next(true);
  }

  orderReturn(userAnswer: boolean) {
    if (userAnswer) {
      this.orderService.returnOrder(this.id)
        .subscribe((order: OrderResult) => {
          this.order = order;
          this.updateList.next(true);
        });
    }
  }

  onNewDeal() {
    this.orderService.setOrder(this.order);
  }
}
