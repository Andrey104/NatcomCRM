import { Component, OnInit } from '@angular/core';
import {DealPage} from '../models/deal/deals';
import {log} from 'util';
import {DealService} from '../services/deal.service';

@Component({
  selector: 'app-deal-page',
  templateUrl: './deal-page.component.html',
  styleUrls: ['./deal-page.component.css']
})
export class DealPageComponent implements OnInit {
  dealPage: DealPage;
  activeDeal: DealPage;

  constructor(private dealService: DealService) { }

  ngOnInit() {
    this.getDeals();
  }


  onScrollDeal() {

  }

  active(deal: DealPage ) {
    this.activeDeal = deal;
  }

  isActive(deal: DealPage) {
    return this.activeDeal === deal;
  }

  activeDealNotNull() {
    return this.activeDeal != null;
  }


  onScroll() {
    console.log('scrooll');
  }


  nextPage() {
    alert('next');
  }

  getDeals(): void {
    this.dealService.getDeals()
      .subscribe(dealPage => this.dealPage = dealPage, error2 => log (error2));
  }



}
