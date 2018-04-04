import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {log} from 'util';
import {OrderResult} from '../../models/orders/order_result';
import {ActivatedRoute} from '@angular/router';
import {UtilsService} from '../../services/utils.service';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {ChatService} from '../../services/chat.service';


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit, OnDestroy {
  orders: OrderResult[];
  page: number;
  lastPage: boolean;
  load: boolean;
  id: string;
  status: { statusName: string, statusUrl: string };
  term$ = new Subject<string>();
  termDate$ = new Subject<string>();
  subInputField: Subscription;
  inputText = '';
  date = '';
  eventMessage = 'Новая сделка';
  private subscriptions: Subscription[] = [];

  constructor(private orderService: OrderService,
              private activatedRoute: ActivatedRoute,
              private utils: UtilsService,
              private chatService: ChatService) {
    this.chatService.messages.subscribe(msg => {
      console.log(msg);
      this.parseEvent(msg);
    });
  }

  parseEvent(msg) {
    switch (msg.data.event) {
      case 'on_create_order': {
        this.orderService.getOrderById(msg.data.data.order_id).subscribe(result => {
          if ((this.orderService.getOrderStatus() === 'all') ||
            (this.orderService.getOrderStatus() === 'processing')) {
            this.orders.unshift(result);
            this.orders.pop();
          }
        });
        break;
      }
      case 'on_reject_order': {
        this.orderService.getOrderById(msg.data.data.order_id).subscribe(result => {
          for (let i = 0; i < this.orders.length; i++) {
            if (msg.data.data.order_id === this.orders[i]) {

            }
          }
        });
        break;
      }
    }
  }

  ngOnInit() {
    this.subscribeOnInputField();
    this.subscribeOnOrderStatus();
    this.subscribeOnDateField();
  }

  subscribeOnInputField() {
    this.subInputField = this.term$
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe(
        (term) => {
          this.inputText = term;
          this.search();
        }
      );
  }

  subscribeOnDateField() {
    this.termDate$
      .subscribe(
        (term) => {
          this.date = term;
          this.search();
        }
      );
  }

  subscribeOnOrderStatus() {
    this.activatedRoute.params
      .subscribe((params) => {
        this.orderService.setOrderStatus(params['status']);
        this.inputText = '';
        this.date = '';
        this.status = this.utils.statusUrlOrder(params['status']);
        this.orders = [];
        this.showOrders();
      });
  }

  // отображение первой страницы заказов в зависимости от содержимого поисковой строки
  search() {
    if ((this.date !== '' || this.inputText !== '') && this.orders !== []) {
      this.orders = [];
      this.load = true;
      this.page = 1;
      const params = this.utils.getSearchParams(this.inputText, this.date);
      this.orderService.getFilterOrders(this.page, params)
        .subscribe((orderPage) => {
            console.log(orderPage);
            this.orders = orderPage.results;
            if (orderPage.next === null) {
              this.lastPage = true;
            } else {
              this.lastPage = false;
            }
            this.load = false;
          }
        );
      document.getElementById('scroll').scrollTop = 0;
    } else {
      this.orders = [];
      this.showOrders();
    }
  }

  // отображение первой страницы заказов по статусу
  showOrders(): void {
    this.page = 1;
    this.lastPage = false;
    this.load = true;
    this.orderService.getOrders(this.page, this.status.statusUrl)
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
    if (this.inputText === '' && this.date === '') {
      this.nextPage();
    } else {
      this.nextFilterPage();
    }
  }

  // подгрузка страницы заказов по статусу
  nextPage() {
    if (!this.lastPage && !this.load) {
      this.load = true;
      this.page = this.page + 1;
      this.orderService.getOrders(this.page, this.status.statusUrl)
        .subscribe(orders => {
          this.orders = this.orders.concat(orders.results);
          this.load = false;
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
      const params = this.utils.getSearchParams(this.inputText, this.date);
      this.orderService.getFilterOrders(this.page, params)
        .subscribe(orders => {
          this.orders = this.orders.concat(orders.results);
          this.load = false;
          if (orders.next === null) {
            this.lastPage = true;
          } else {
            this.lastPage = false;
          }
        }, error2 => {
          log(error2);
          this.load = false;
        });
    }
  }

  onActivate(c) {
    if (c.needSubscribe === true) {
      const modal = c.updateList
        .subscribe(next => {
          if (next) {
            this.orders = [];
            if (this.inputText === '' && this.date === '') {
              this.showOrders();
            } else {
              this.search();
            }
          }
        });
      this.subscriptions.push(modal);
    }
  }

  onDeactivate(c) {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }

  ngOnDestroy(): void {
    if (this.subInputField) {
      this.subInputField.unsubscribe();
    }
  }
}
