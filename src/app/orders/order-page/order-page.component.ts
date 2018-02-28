import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {log} from 'util';
import {OrderResult} from '../../models/orders/order_result';


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  orders: OrderResult[];
  page: number;
  lastPage: boolean;
  load: boolean;
  @Input() searchStr = '';
  @Input() selector = 1;
  id: string;
  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.showOrders();
  }
  // отображение заказов(если поисковая строка пустая)
  filterByStatus() {
    if (this.searchStr !== '') {
      return;
    } else {
      this.showOrders();
    }
  }
  // отображение первой страницы заказов в зависимости от содержимого поисковой строки
  search() {
    if (this.searchStr === '') {
      this.showOrders();
    } else {
      this.page = 1;
      this.orderService.getFilterOrders(this.searchStr, this.page).subscribe(order => {
        this.orders = order.results;
        if (order.next === null) {
          this.lastPage = true;
        } else {
          this.lastPage = false;
        }
        document.getElementById('scroll').scrollTop = 0;
      });
    }
  }
  // отображение первой страницы заказов по статусу
  showOrders(): void {
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
        document.getElementById('scroll').scrollTop = 0;
      }, error2 => {
        log(error2);
        this.load = false;
      });
  }

  onScroll() {
    if (this.searchStr === '') {
      this.nextPage();
    } else {
      this.nextFilterPage();
    }
  }
  // подгрузка страницы заказов по статусу
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
  // подгрузка страницы заказов со значением фильтра
  nextFilterPage() {
    if (!this.lastPage && !this.load) {
      this.load = true;
      this.page = this.page + 1;
      this.orderService.getFilterOrders(this.searchStr, this.page)
        .subscribe(orders => {
          this.orders = this.orders.concat(orders.results);
          this.load = false;
          if (orders.next === null) {
            this.lastPage = true;
          }
        },  error2 => {
          log(error2);
          this.load = false;
        });
    }
  }
}
