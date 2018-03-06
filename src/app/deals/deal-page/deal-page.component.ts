import {Component, OnInit} from '@angular/core';
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
  page: number;
  lastPage: boolean;
  load: boolean;
  searchStr = '';

  constructor(private dealService: DealService, private activatedRoute: ActivatedRoute,
              private utils: UtilsService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.status = this.utils.statusUrlDeal(params['status']);
      this.showDeals();
    });
  }

  search() {
    if (this.searchStr !== '') {
      this.page = 1;
      this.load = true;
      this.lastPage = false;
      this.dealService.getFilterDeals(this.page, this.searchStr).subscribe(deals => {
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
    this.nextPage();
  }

  nextPage() {
    if (!this.lastPage && !this.load) {
      this.load = true;
      this.page = this.page + 1;
      this.dealService.getDeals(this.status, this.page).subscribe(dealPage => {
        this.dealPage = this.dealPage.concat(dealPage.results);
        if (dealPage.next === null) {
          this.lastPage = true;
        }
        this.load = false;
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
      }, error2 => log(error2));
  }

}
