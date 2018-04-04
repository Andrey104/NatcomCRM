import {Component, Inject, Input, OnChanges} from '@angular/core';
import {ClientDeal} from '../models/clients/client-deal';
import {OrderService} from '../services/order.service';
import {DealService} from '../services/deal.service';
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {UtilsService} from '../services/utils.service';
import {MeasurementService} from '../services/measurement.service';
import {MountService} from '../services/mount.service';

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
              private measurementService: MeasurementService,
              private mountService: MountService,
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
        } else if (this.url.indexOf('new_deal') !== -1) {
          this.forwardUrl = `/new_deal/client/${params['client_id']}`;
        } else if (this.url.indexOf('to_deal') !== -1) {
          this.forwardUrl = `/orders/${this.orderService.getOrderStatus()}/${params['id']}`;
          this.forwardUrl += `/to_deal/client/${params['client_id']}`;
        } else if (this.url.indexOf('measurements') !== -1) {
          this.forwardUrl = `measurements/${this.measurementService.measurementStatus}`;
          this.forwardUrl += `/${params['measurement_id']}/deal/${this.deal.id}`;
        } else if (this.url.indexOf('mounts') !== -1) {
          this.forwardUrl = `mounts/${this.mountService.statusMount}`;
          this.forwardUrl += `/${params['mount_id']}/deal/${this.deal.id}`;
        }
      });
  }

  statusDeal(status: number) {
    return this.utils.statusDeal(status);
  }

}
