import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {log} from 'util';
import {OrderResult} from '../../models/orders/order_result';
import {ActivatedRoute} from '@angular/router';
import {UtilsService} from '../../services/utils.service';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';


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
  subInputField: Subscription;
  @ViewChild('input') input;

  constructor(private orderService: OrderService,
              private activatedRoute: ActivatedRoute,
              private utils: UtilsService) {
  }

  ngOnInit() {
    this.subscribeOnInputField();
    this.subscribeOnOrderStatus();
  }

  subscribeOnInputField() {
    this.subInputField = this.term$
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe(
        (term) => {
          this.search(term);
        }
      );
  }

  subscribeOnOrderStatus() {
    this.activatedRoute.params
      .subscribe((params) => {
        this.status = this.utils.statusUrlOrder(params['status']);
        this.orders = [];
        this.showOrders();
      });
  }

  // отображение первой страницы заказов в зависимости от содержимого поисковой строки
  search(text: string) {
    if (text !== '') {
      this.load = true;
      this.page = 1;
      this.orderService.getFilterOrders(this.page, text)
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
    if (this.input.nativeElement.value === '') {
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
      this.orderService.getFilterOrders(this.page, this.input.nativeElement.value)
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

  ngOnDestroy(): void {
    if (this.subInputField) {
      this.subInputField.unsubscribe();
    }
  }
}
