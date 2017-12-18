import { Component, OnInit } from '@angular/core';

import { Orders } from '../models/orders/order';
import { OrderService } from '../services/order.service';
import {catchError} from "rxjs/operators";
import {log} from "util";


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  orders: Orders;
  activeOrder: Orders;
  error;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
   this.getOrders();
  }

  active(order:Orders){
    this.activeOrder = order;
  }

  isActive(order:Orders){
    return this.activeOrder === order;
  }

  activeOrderNotNull(){
    return this.activeOrder != null;
  }


  getOrders(): void {
    this.orderService.getOrders(1)
      .subscribe(orders => this.orders = orders, error2 => log (error2));
  }



}
