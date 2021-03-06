import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {log} from 'util';
import {OrderResult} from '../../models/orders/order_result';
import {ActivatedRoute} from '@angular/router';
import {UtilsService} from '../../services/utils.service';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {WebsocketService} from '../../services/websocket.service';


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
  private subscriptions: Subscription[] = [];
  subOnWebSocket: Subscription;

  constructor(private orderService: OrderService,
              private activatedRoute: ActivatedRoute,
              private utils: UtilsService,
              private webSocketService: WebsocketService) {
  }

  ngOnInit() {
    this.subscribeOnInputField();
    this.subscribeOnOrderStatus();
    this.subscribeOnDateField();
    this.subOnWebSocket = this.webSocketService.message.subscribe((response) => {
      this.parseEvent(response);
    });
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

  parseEvent(msg) {
    switch (msg.event) {
      case 'on_create_order': {
        this.refreshAllAndProcessing(Number(msg.data.order_id));
        break;
      }
      case 'on_reject_order': {
        if ((this.orderService.getOrderStatus() === 'all') ||
          (this.orderService.getOrderStatus() === 'processing')) {
          this.showOrders();
        } else if (this.orderService.getOrderStatus() === 'canceled') {
          this.orderService.getOrderById(msg.data.order_id)
            .subscribe((result) => {
              this.orders.unshift(result);
              this.orders.pop();
            });
        }
        break;
      }
      case 'on_defer_order': {
        if ((this.orderService.getOrderStatus() === 'all') ||
          (this.orderService.getOrderStatus() === 'processing')) {
          this.showOrders();
        }
        break;
      }
      case 'on_return_order': {
        if (this.orderService.getOrderStatus() === 'processing') {
          this.orderService.getOrderById(msg.data.order_id)
            .subscribe((result) => {
              this.orders.unshift(result);
              this.orders.pop();
            });
        } else if (this.orderService.getOrderStatus() === 'canceled' || this.orderService.getOrderStatus() === 'all') {
          this.showOrders();
        }
        break;
      }
      case 'on_create_deal': {
        if ((this.orderService.getOrderStatus() === 'all') ||
          (this.orderService.getOrderStatus() === 'completed')) {
          this.orderService.getOrderById(msg.data.order_id)
            .subscribe((result) => {
              this.orders.unshift(result);
              this.orders.pop();
            });
        } else if (this.orderService.getOrderStatus() === 'processing') {
          this.showOrders();
        }
      }
    }
  }

  refreshAllAndProcessing(orderId: number) {
    this.orderService.getOrderById(orderId)
      .subscribe((result) => {
        if ((this.orderService.getOrderStatus() === 'all') ||
          (this.orderService.getOrderStatus() === 'processing')) {
          this.orders.unshift(result);
          this.orders.pop();
        }
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
    } else if (this.subOnWebSocket) {
      this.subOnWebSocket.unsubscribe();
    }
  }
}
