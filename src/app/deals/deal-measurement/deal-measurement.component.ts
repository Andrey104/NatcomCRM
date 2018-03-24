import {AfterViewChecked, Component, Inject, OnInit} from '@angular/core';
import {DealMeasurement} from '../../models/deal/deal_measurement';
import {ActivatedRoute} from '@angular/router';
import {MeasurementService} from '../../services/measurement.service';
import {Client} from '../../models/client';
import {Picture} from '../../models/picture';
import {UtilsService} from '../../services/utils.service';
import {DealService} from '../../services/deal.service';
import {DOCUMENT} from '@angular/common';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-deal-measurement',
  templateUrl: './deal-measurement.component.html',
  styleUrls: ['./deal-measurement.component.css'],
})
export class DealMeasurementComponent implements OnInit, AfterViewChecked {
  measurement: DealMeasurement;
  id: number;
  clientInfo = false;
  showEditButtons = false;
  client: Client;
  flag = false;
  picture: Picture;
  loadPage: boolean;
  showMeasurementReject = false;
  showMeasurementTransfer = false;
  showMeasurementEdit = false;
  showPicture = false;
  statusDeal: string;
  backUrl: string;
  url: string;

  constructor(private activatedRoute: ActivatedRoute,
              private measurementService: MeasurementService,
              private utils: UtilsService,
              private dealService: DealService,
              @Inject(DOCUMENT) private document: Document,
              private orderService: OrderService) {
    this.url = this.document.location.href;
  }

  ngOnInit() {
    this.subscribeOnMeasurement();
    this.getBackUrl();
  }

  ngAfterViewChecked(): void {
    if (this.flag === true) {
      document.getElementById('page').scrollTop = document.getElementById('page').scrollHeight;
      this.flag = false;
    }
  }

  getBackUrl() {
    this.activatedRoute.params.subscribe((params) => {
      if (this.url.indexOf('client_deal') !== -1) {
        this.backUrl = `/orders/${this.orderService.getOrderStatus()}/${params['id']}`;
        this.backUrl += `/client/${params['client_id']}/client_deal/${params['client_deal_id']}`;
        console.log(this.backUrl);
      } else if (this.url.indexOf('deals') !== -1) {
        this.backUrl = `/deals/${this.dealService.statusDeal}/${params['id']}`;
      }
    });
  }

  successMeasurementUpdate() {
    this.loadPage = true;
    this.getMeasurementById();
  }

  subscribeOnMeasurement() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['measurement_id'];
      this.loadPage = true;
      this.getMeasurementById();
    });
  }

  getMeasurementById() {
    this.measurementService.getMeasurement(this.id)
      .subscribe((measurement) => {
        this.measurement = measurement;
        this.showEditButtons = this.utils.showEditButtons(String(this.measurement.deal_user.id));
        this.loadPage = false;
      });
  }

  openClientInfo(idClient: number) {
    this.clientInfo = true;
    this.client = this.measurement.clients[idClient];
  }

  closeClientInfo() {
    this.clientInfo = false;
    this.client = null;
  }

  sendComment(comment: string) {
    this.measurementService.measurementComment(this.id, comment)
      .subscribe(next => {
        this.measurement.comments.push(next);
        this.flag = true;
      }, error => {
        console.log(error);
      });
  }

  openPicture(idPicture: number) {
    this.picture = this.measurement.pictures[idPicture];
    this.showPicture = true;
  }

  closePicture() {
    this.picture = null;
  }
}
