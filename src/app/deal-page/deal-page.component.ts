import { Component, OnInit } from '@angular/core';
import {Deal} from '../models/deal';
import {log} from "util";
import {DealService} from '../services/deal.service';

@Component({
  selector: 'app-deal-page',
  templateUrl: './deal-page.component.html',
  styleUrls: ['./deal-page.component.css']
})
export class DealPageComponent implements OnInit {
  deals: Deal[];
  activeDeal: Deal;
  error;

  constructor(private dealService: DealService) { }

  ngOnInit() {
    this.getDeals();
  }


  active(deal:Deal){
    this.activeDeal = deal;
  }

  isActive(deal:Deal){
    return this.activeDeal === deal;
  }

  activeDealNotNull(){
    return this.activeDeal != null;
  }


  getDeals(): void {
    this.dealService.getDeals()
      .subscribe(deals => this.deals = deals, error2 => log (error2));
  }



}
