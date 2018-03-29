import {Component, Inject, Input, OnChanges} from '@angular/core';
import {ClientDeal} from '../models/clients/client-deal';
import {OrderService} from '../services/order.service';
import {DealService} from '../services/deal.service';
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {UtilsService} from '../services/utils.service';

@Component({
  selector: 'app-client-deal',
  templateUrl: './client-deal.component.html',
  styleUrls: ['./client-deal.component.css']
})
export class ClientDealComponent implements OnChanges {
  @Input() deal: ClientDeal;
  url: string;
  forwardUrl: string;

  constructor(private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private dealService: DealService,
              private utils: UtilsService,
              @Inject(DOCUMENT) private document: Document) {
    this.url = this.document.location.href;
  }

  ngOnChanges() {
    this.activatedRoute.params
      .subscribe((params) => {
        if (this.url.indexOf('orders') !== -1) {
          const status = this.orderService.getOrderStatus();
          this.forwardUrl = `client_deal/${this.deal.id.toString()}`;
        } else if (this.url.indexOf('deals') !== -1) {
          const status = this.dealService.statusDeal;
          this.forwardUrl = `/deals/${status}/${this.deal.id.toString()}`;
        }
    });
  }

  statusDeal(status: number) {
    return this.utils.statusDeal(status);
  }

}
