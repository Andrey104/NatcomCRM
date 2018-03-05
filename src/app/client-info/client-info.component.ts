import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Phone} from '../models/phone';
import {OrderAction} from '../models/orders/order_action';
import {UtilsService} from '../services/utils.service';
import { Location } from '@angular/common';

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
  constructor(private location: Location,
              private clientService: ClientService,
              private activatedRoute: ActivatedRoute,
              private utils: UtilsService) { }
  ngOnInit() {
    this.getDeals();
  }

  getDeals(): void {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.id_client = params['client_id'];
      this.loader = true;
      this.clientService.getClient(this.id_client).subscribe(client => {
        this.client = client;
        this.loader = false;
      });
    });
  }
  statusDeal(status: number) {
    return this.utils.statusDeal(status);
  }

  goBack() {
    this.location.back();
  }
}
