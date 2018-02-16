import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {UtilsService} from "../../services/utils.service";
import {OrderAction} from "../../models/orders/order_action";
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
  ngOnInit() {
    this.subscribeOrderId();
  }

  deferOpenValue: boolean;
  rejectOpenValue: boolean;
  inDealOpenValue: boolean;



 /* activeOrderNotNull() {
    return this.orderPage.activeOrderNotNull();
  }

  deferIsOpen() {
    return this.deferOpenValue;
  }

  rejectIsOpen() {
    return this.rejectOpenValue;
  }

  inDealIsOpen() {
    return this.inDealOpenValue;
  }*/

  // ф-ции для кнопок--------------
  reject() {
    this.rejectOpenValue = true;
  }
  defer() {
    this.deferOpenValue = true;
  }
  in_a_deal() {
    this.inDealOpenValue = true;
  }
  //-------------------------------

  /*closeDefer(update: boolean) {
    this.deferOpenValue = false;
    if (update) {
      this.orderPage.update(this.order.id);
    }
  }
  closeReject() {
    this.rejectOpenValue = false;
  }
  closeInDeal() {
    this.inDealOpenValue = false;
  }*/
  //-------------------------------
  actionDecoder(action: OrderAction) {
    return this.utils.orderActionDecoder(action);
  }
  dateFormat(date: string) {
    return this.utils.fullDateFormat(date);
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
