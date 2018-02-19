import {Component, Input, OnInit} from '@angular/core';

import {Orders} from '../../models/orders/order';
import {OrderService} from '../../services/order.service';
import {catchError} from 'rxjs/operators';
import {log} from 'util';
import {OrderResult} from '../../models/orders/order_result';
import {FormBuilder, FormsModule} from '@angular/forms';



@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  orders: OrderResult[];
  activeOrder: Orders;
  error;
  page: number;
  lastPage: boolean;
  load: boolean;
  @Input() searchStr = '';
  @Input() selector = 1;
  id: string;
  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.showOrders(null);
  }
  filterByStatus() {
    if (this.searchStr !== '') {
      return;
    } else {
      this.showOrders(null);
    }
  }
  search() {
    if (this.searchStr === '') {
      this.showOrders(null);
    } else {
      this.orderService.getFilterOrders(this.searchStr).subscribe(order => {
        this.orders = order.results;
      });
    }
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
    this.orderService.getOrders(this.page, this.selector)
      .subscribe(orders => {
        this.load = false;
        this.orders = orders.results;
        if (orders.next === null) {
          this.lastPage = true;
        }
        // if id !== null - update order list
        if (id !== null) {
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

  onScroll() {
    this.nextPage();
  }

  nextPage() {
    if (!this.lastPage && !this.load) {
      console.log('Начало загрузки');
      this.load = true;
      this.page = this.page + 1;
      this.orderService.getOrders(this.page, this.selector)
        .subscribe(orders => {
          console.log('Получение с сервера');
          this.orders = this.orders.concat(orders.results);
          this.load = false;
          console.log('конец');
          if (orders.next === null) {
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
        resultOrder = order;
      }
    }
    return resultOrder;
  }

}
