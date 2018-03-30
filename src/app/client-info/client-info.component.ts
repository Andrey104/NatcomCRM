import {Component, Inject, OnInit} from '@angular/core';
import {Client} from '../models/clients/client';
import {ClientService} from '../services/client.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {UtilsService} from '../services/utils.service';
import {OrderService} from '../services/order.service';
import {DOCUMENT} from '@angular/common';
import {DealService} from '../services/deal.service';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {
  client: Client;
  private subscription: Subscription;
  private id_client: number;
  id: number;
  loader: boolean;
  backUrl: string;
  changeClient: Client = null;
  showChangeClientDialog = false;
  url: string;

  constructor(private orderService: OrderService,
              private clientService: ClientService,
              private activatedRoute: ActivatedRoute,
              private utils: UtilsService,
              private dealService: DealService,
              @Inject(DOCUMENT) private document: Document) {
    this.url = this.document.location.href;
  }

  ngOnInit() {
    this.getDeals();
  }

  getDeals(): void {
    this.subscription = this.activatedRoute.params
      .subscribe(params => {
        this.id = params['id'];
        this.id_client = params['client_id'];
        this.loader = true;
        this.getBackUrl();
        this.clientService.getClient(this.id_client)
          .subscribe(client => {
            this.client = client;
            this.loader = false;
          });
      });
  }

  getBackUrl() {
    if (this.url.indexOf('orders') !== -1) {
      const orderStatus = this.orderService.getOrderStatus();
      this.backUrl = `/orders/${orderStatus}/${this.id.toString()}`;
    } else if (this.url.indexOf('deals') !== -1) {
      const dealStatus = this.dealService.statusDeal;
      this.backUrl = `/deals/${dealStatus}/${this.id.toString()}`;
    } else if (this.url.indexOf('new_deal')) {
      this.backUrl = `/new_deal`;
    }
  }

  changeClientDialog() {
    this.changeClient = JSON.parse(JSON.stringify(this.client));
    this.showChangeClientDialog = !this.showChangeClientDialog;
  }

  successChangeClient(client: Client) {
    if (client !== null) {
      this.client = client;
    }
    this.changeClient = null;
  }
}
