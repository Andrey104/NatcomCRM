import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DealService} from '../../services/deal.service';
import {DealResult} from '../../models/deal/deal_result';


@Component({
  selector: 'app-deal-detail',
  templateUrl: './deal-detail.component.html',
  styleUrls: ['./deal-detail.component.css']
})
export class DealDetailComponent implements OnInit {
  private id;

  constructor(private activatedRoute: ActivatedRoute, private dealService: DealService) { }
  deal: DealResult;
  ngOnInit() {
    this.subscribeDealId();
  }

  subscribeDealId(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.dealService.getDealById(this.id).subscribe(deal => {
        this.deal = deal;
      });
    });
  }

}
