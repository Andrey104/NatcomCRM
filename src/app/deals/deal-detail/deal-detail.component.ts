import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DealService} from '../../services/deal.service';
import {DealResult} from '../../models/deal/deal_result';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-deal-detail',
  templateUrl: './deal-detail.component.html',
  styleUrls: ['./deal-detail.component.css'],
})
export class DealDetailComponent implements OnInit {
  private id;
  page = 1;
  select;

  constructor(private activatedRoute: ActivatedRoute, private dealService: DealService, private utils: UtilsService) { }
  deal: DealResult;
  ngOnInit() {
    this.select = 0;
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
  onSelect(ourSelect) {
    this.select = ourSelect;
  }
  dealStatus(status) {
    return this.utils.statusDeal(status);
  }
}
