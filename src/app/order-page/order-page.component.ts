import { Component, OnInit } from '@angular/core';

import { Order } from '../models/order';
import { OrderService } from '../services/order.service';
import {catchError} from "rxjs/operators";
import {log} from "util";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  orders: Order[];
  activeOrder: Order;
  error;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
   this.getOrders();
  }

  active(order:Order){
    this.activeOrder = order;
  }

  isActive(order:Order){
    return this.activeOrder === order;
  }

  activeOrderNotNull(){
    return this.activeOrder != null;
  }


  getOrders(): void {
    this.orderService.getOrders()
      .subscribe(orders => this.orders = orders, error2 => log (error2));
  }



}
