import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {UtilsService} from '../../services/utils.service';
import {OrderAction} from '../../models/orders/order_action';
import {ActivatedRoute} from '@angular/router';
import {OrderResult} from '../../models/orders/order_result';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(private orderService: OrderService, private utils: UtilsService, private activatedRoute: ActivatedRoute) {
  }
  orders: OrderResult[];
  private id: number;
  order: OrderResult;
  deferOpenValue = false;
  rejectOpenValue = false;
  inDealOpenValue = false;
  ngOnInit() {
    this.subscribeOrderId();
  }

  openDefer() {
    this.deferOpenValue = true;
  }
  closeDefer() {
    this.deferOpenValue = false;
    this.subscribeOrderId();
  }

  openReject() {
    this.rejectOpenValue = true;
  }
  closeReject() {
    this.rejectOpenValue = false;
    this.subscribeOrderId();
  }
  openToDeal() {
    this.inDealOpenValue = true;
  }
  closeToDeal() {
    this.inDealOpenValue = false;
    this.subscribeOrderId();
  }
  actionDecoder(action: OrderAction) {
    return this.utils.orderActionDecoder(action);
  }
  subscribeOrderId(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.orderService.getOrderById(this.id).subscribe(order => {
        this.order = order;
      });
    });
  }
}
