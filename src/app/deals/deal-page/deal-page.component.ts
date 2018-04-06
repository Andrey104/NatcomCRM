import {Component, OnInit} from '@angular/core';
import {log} from 'util';
import {DealService} from '../../services/deal.service';
import {DealResult} from '../../models/deal/deal_result';
import {ActivatedRoute} from '@angular/router';
import {UtilsService} from '../../services/utils.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Subscription} from 'rxjs/Subscription';
import {WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-deal-page',
  templateUrl: './deal-page.component.html',
  styleUrls: ['./deal-page.component.css'],
})
export class DealPageComponent implements OnInit {
  dealPage: DealResult[];
  status: { statusName: string, statusUrl: string };
  page: number;
  lastPage: boolean;
  load: boolean;
  term$ = new Subject<string>();
  termDate$ = new Subject<string>();
  inputText = '';
  date = '';
  showEventDialog = false;
  event = {eventMessage: '', eventRoute: ''};
  private subscriptions: Subscription[] = [];

  constructor(private dealService: DealService,
              private activatedRoute: ActivatedRoute,
              private utils: UtilsService,
              private webSocketService: WebsocketService) {
  }

  ngOnInit() {
    this.subscribeOnUrl();
    this.subscribeOnInputField();
    this.subscribeOnDateField();
    this.webSocketService.message.subscribe((response) => {
      console.log(response);
    });
  }

  parseEvent(msg) {
    switch (msg.data.event) {
      case 'on_create_order': {
        this.event.eventMessage = 'Новая заявка';
        this.event.eventRoute = `/orders/all/${msg.data.data.order_id}`;
        this.showEventDialog = true;
        break;
      }
      case 'on_create_deal': {
        this.dealService.getDealById(msg.data.data.deal_id)
          .subscribe((deal: DealResult) => {
            if (deal.status === 0) {
              if ((this.dealService.statusDeal === 'all') ||
                (this.dealService.statusDeal === 'processing')) {
                this.dealPage.unshift(deal);
                this.dealPage.pop();
              }
            } else if (deal.status === 1) {
              if ((this.dealService.statusDeal === 'all') ||
                (this.dealService.statusDeal === 'measurement_assigned')) {
                this.dealPage.unshift(deal);
                this.dealPage.pop();
              }
            }
          });
        break;
      }
      case 'on_reject_deal': {
        this.dealService.getDealById(msg.data.data.deal_id)
          .subscribe((deal: DealResult) => {
            if (deal.status === 0) {
              this.dealPage.unshift(deal);
              this.dealPage.pop();
            } else if (deal.status !== 4) {
              this.showDeals();
            }
          });
        break;
      }
    }
  }

  subscribeOnUrl() {
    this.activatedRoute.params.subscribe(params => {
      this.inputText = '';
      this.date = '';
      this.status = this.utils.statusUrlDeal(params['status']);
      this.dealService.statusDeal = params['status'];
      this.dealPage = [];
      this.showDeals();
    });
  }

  subscribeOnInputField() {
    this.term$
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

  showDeals(): void {
    this.page = 1;
    this.load = true;
    this.lastPage = false;
    this.dealService.getDeals(this.page, this.status.statusUrl)
      .subscribe(dealPage => {
        this.dealPage = dealPage.results;
        if (dealPage.next === null) {
          this.lastPage = true;
        }
        this.load = false;
        document.getElementById('scroll').scrollTop = 0;
      }, error2 => log(error2));
  }

  search() {
    if ((this.date !== '' || this.inputText !== '') && this.dealPage !== []) {
      this.dealPage = [];
      this.page = 1;
      this.load = true;
      this.lastPage = false;
      const params = this.utils.getSearchParams(this.inputText, this.date);
      this.dealService.getFilterDeals(this.page, params)
        .subscribe(deals => {
          this.dealPage = deals.results;
          if (deals.next === null) {
            this.lastPage = true;
          }
          this.load = false;
        });
    } else {
      this.dealPage = [];
      this.showDeals();
    }
  }

  onScrollDeal() {
    if (this.inputText === '' && this.date === '') {
      this.nextPage();
    } else {
      this.nextFilterPage();
    }
  }

  nextPage() {
    if (!this.lastPage && !this.load) {
      this.load = true;
      this.page = this.page + 1;
      this.dealService.getDeals(this.page, this.status.statusUrl)
        .subscribe(dealPage => {
          this.dealPage = this.dealPage.concat(dealPage.results);
          if (dealPage.next === null) {
            this.lastPage = true;
          }
          this.load = false;
        });
    }
  }

  nextFilterPage() {
    if (!this.lastPage && !this.load) {
      this.load = true;
      this.page = this.page + 1;
      const params = this.utils.getSearchParams(this.inputText, this.date);
      this.dealService.getFilterDeals(this.page, params)
        .subscribe(dealPage => {
          this.dealPage = this.dealPage.concat(dealPage.results);
          if (dealPage.next === null) {
            this.lastPage = true;
          }
          this.load = false;
        });
    }
  }

  onActivate(c) {
    if (c.needSubscribe === true) {
      const modal = c.updateList
        .subscribe(next => {
          if (next) {
            this.dealPage = [];
            if (this.inputText === '' && this.date === '') {
              this.showDeals();
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

}
