import { Component, OnInit } from '@angular/core';
import {DealPage} from '../../models/deal/deals';
import {log} from 'util';
import {DealService} from '../../services/deal.service';
import {DealResult} from '../../models/deal/deal_result';
import {ActivatedRoute} from '@angular/router';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-deal-page',
  templateUrl: './deal-page.component.html',
  styleUrls: ['./deal-page.component.css'],
})
export class DealPageComponent implements OnInit {
  dealPage: DealResult[];
  status = 0;
  status_deal;
  page: number;
  lastPage: boolean;
  load: boolean;

  constructor(private dealService: DealService, private activatedRoute: ActivatedRoute,
              private utils: UtilsService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.status = this.utils.statusUrlDeal(params['status']);
      this.showDeals();
    });
  }


  onScrollDeal() {
    this.nextPage();
  }
  nextPage() {
    if (!this.lastPage && !this.load) {
      this.load = true;
      this.page = this.page + 1;
      console.log('Пошла загрузка');
      this.dealService.getDeals(this.status, this.page).subscribe(dealPage => {
        console.log('Загрузка с сервера завершилась');
        this.dealPage  = this.dealPage.concat(dealPage.results);
        if (dealPage.next === null) {
          this.lastPage = true;
        }
        this.load = false;
        console.log('Загрузка завершилась');
      });
    }
  }

  showDeals(): void {
    this.page = 1;
    this.load = true;
    this.lastPage = false;
    this.dealService.getDeals(this.status, this.page)
      .subscribe(dealPage => {
        this.dealPage = dealPage.results;
        if (dealPage.next === null) {
          this.lastPage = true;
        }
        this.load = false;
        }, error2 => log (error2));
  }

}
