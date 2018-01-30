import {Component, OnInit} from '@angular/core';

import {Orders} from '../../models/orders/order';
import {OrderService} from '../../services/order.service';
import {catchError} from "rxjs/operators";
import {log} from "util";
import {OrderResult} from "../../models/orders/order_result";
import {loadavg} from "os";


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  orders: OrderResult[];
  activeOrder: Orders;
  error;
  page:number;
  lastPage:boolean;
  load: boolean;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.showOrders(null);
  }

  active(order: Orders) {
    this.activeOrder = order;
  }

  isActive(order: Orders) {
    return this.activeOrder === order;
  }

  activeOrderNotNull() {
    return this.activeOrder != null;
  }


  showOrders(id): void {
    this.page = 1;
    this.lastPage = false;
    this.load = true;
    this.orderService.getOrders(this.page)
      .subscribe(orders => {
        this.load = false;
        this.orders = orders.results;
        if (orders.next === 'null'){
          this.lastPage = true;
        }
        // if id !== null - update order list
        if (id!==null){
          let order = this.getOrderById(id);
          if (order !== null) {
            this.activeOrder = order;
          }
        }

      }, error2 => {
        log(error2);
        this.load = false;
      });
  }

  update(id: string) {
    this.showOrders(id);
  }

  onScroll(){
    this.nextPage()
  }

  nextPage(){
    this.page = this.page + 1;
    if (!this.lastPage && !this.load) {
      this.load = true;
      this.orderService.getOrders(this.page)
        .subscribe(orders => {
          this.orders = this.orders.concat(orders.results);
          this.load = false;
          if (orders.next === null){
            this.lastPage = true;
          }
        }, error2 => {
          log(error2);
          this.load = false;
        });
    }
  }

  getOrderById(id) {
    let resultOrder = null;
    for (let order of this.orders) {
      if (order.id === id) {
        //console.log('ok');
        resultOrder = order;
      }
    }
    return resultOrder;
  }


}
