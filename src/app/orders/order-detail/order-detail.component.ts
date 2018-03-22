import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {UtilsService} from '../../services/utils.service';
import {OrderAction} from '../../models/orders/order_action';
import {ActivatedRoute} from '@angular/router';
import {OrderResult} from '../../models/orders/order_result';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(private orderService: OrderService,
              private utils: UtilsService,
              private activatedRoute: ActivatedRoute) {
  }

  private id: number;
  order: OrderResult;
  loader: boolean;
  showDialogReject = false;
  showDialogDefer = false;
  needSubscribe = true;
  updateList: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  ngOnInit() {
    this.subscribeOrderId();
  }

  actionDecoder(action: OrderAction) {
    return this.utils.orderActionDecoder(action);
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

  onNewDeal() {
    this.orderService.setOrder(this.order);
  }
}
