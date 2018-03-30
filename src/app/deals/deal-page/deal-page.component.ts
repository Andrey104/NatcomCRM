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
  inputText = '';
  private subscriptions: Subscription[] = [];

  constructor(private dealService: DealService,
              private activatedRoute: ActivatedRoute,
              private utils: UtilsService) {
  }

  ngOnInit() {
    this.subscribeOnUrl();
    this.subscribeOnInputField();
  }

  subscribeOnUrl() {
    this.activatedRoute.params.subscribe(params => {
      this.inputText = '';
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
          this.search(term);
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

  search(text: string) {
    if (text !== '') {
      this.page = 1;
      this.load = true;
      this.lastPage = false;
      this.dealService.getFilterDeals(this.page, text)
        .subscribe(deals => {
          this.dealPage = deals.results;
          if (deals.next === null) {
            this.lastPage = true;
          }
          this.load = false;
        });
    } else {
      this.showDeals();
    }
  }

  onScrollDeal() {
    if (this.inputText === '') {
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
      this.dealService.getFilterDeals(this.page, this.inputText)
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
          console.log(c + 'в сделке');
          if (next) {
            this.dealPage = [];
            if (this.inputText === '') {
              this.showDeals();
            } else {
              this.search(this.inputText);
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
