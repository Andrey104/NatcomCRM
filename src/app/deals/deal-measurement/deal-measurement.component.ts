import {AfterViewChecked, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {DealMeasurement} from '../../models/deal/deal_measurement';
import {ActivatedRoute} from '@angular/router';
import {MeasurementService} from '../../services/measurement.service';
import {Client} from '../../models/clients/client';
import {Picture} from '../../models/picture';
import {UtilsService} from '../../services/utils.service';
import {DealService} from '../../services/deal.service';
import {DOCUMENT} from '@angular/common';
import {OrderService} from '../../services/order.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MountService} from '../../services/mount.service';
import {WebsocketService} from '../../services/websocket.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-deal-measurement',
  templateUrl: './deal-measurement.component.html',
  styleUrls: ['./deal-measurement.component.css'],
})
export class DealMeasurementComponent implements OnInit, AfterViewChecked, OnDestroy {
  measurement: DealMeasurement;
  id: number;
  subscribeOnSocket: Subscription;
  showEditButtons = false;
  client: Client;
  flag = false;
  picture: Picture;
  loadPage: boolean;
  showMeasurementReject = false;
  showMeasurementTransfer = false;
  showMeasurementEdit = false;
  showDeletePhotoDialog = false;
  photoDeleteID: number;
  showPicture = false;
  statusDeal: string;
  backUrl: string;
  url: string;
  showToDealButton = true;
  userType = Number(localStorage.getItem('user_type'));

  constructor(private activatedRoute: ActivatedRoute,
              private measurementService: MeasurementService,
              private utils: UtilsService,
              private dealService: DealService,
              @Inject(DOCUMENT) private document: Document,
              private orderService: OrderService,
              private sanitization: DomSanitizer,
              private mountService: MountService,
              private webSocketService: WebsocketService) {
    this.url = this.document.location.href;
  }


  ngOnInit() {
    this.subscribeOnMeasurement();
    this.getBackUrl();
    this.subscribeOnSocket = this.webSocketService.message.subscribe((response) => {
      switch (response.event) {
        case 'on_comment_measurement': {
          if ((response.data.comment.user.id !== Number(localStorage.getItem('id_manager')))
            && (Number(response.data.measurement_id) === this.measurement.id)) {
            this.measurement.comments.push(response.data.comment);
          }
          break;
        }
        case 'on_complete_measurement': {
          if (Number(response.data.id) === this.measurement.id) {
            this.measurementService.getMeasurement(this.measurement.id)
              .subscribe((measurement: DealMeasurement) => {
                this.measurement = measurement;
              });
          }
          break;
        }
        case 'on_reject_measurement': {
          if (Number(response.data.id) === this.measurement.id) {
            this.measurementService.getMeasurement(this.measurement.id)
              .subscribe((measurement: DealMeasurement) => {
                this.measurement = measurement;
              });
          }
          break;
        }
        case 'on_transfer_measurement': {
          if (Number(response.data.id) === this.measurement.id) {
            this.measurementService.getMeasurement(this.measurement.id)
              .subscribe((measurement: DealMeasurement) => {
                this.measurement = measurement;
              });
          }
          break;
        }
        case 'on_take': {
          if (Number(response.data.id) === this.measurement.id) {
            this.measurementService.getMeasurement(this.measurement.id)
              .subscribe((measurement: DealMeasurement) => {
                this.measurement = measurement;
              });
          }
          break;
        }
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.flag === true) {
      document.getElementById('page').scrollTop = document.getElementById('page').scrollHeight;
      this.flag = false;
    }
  }

  getBackground(pictureurl: String) {
    return this.sanitization.bypassSecurityTrustStyle(`url(${pictureurl})`);
  }

  getBackUrl() {
    this.activatedRoute.params.subscribe((params) => {
      if (this.url.indexOf('client_deal') !== -1) {
        this.showToDealButton = false;
        this.backUrl = `/orders/${this.orderService.getOrderStatus()}/${params['id']}`;
        this.backUrl += `/client/${params['client_id']}/client_deal/${params['client_deal_id']}`;
      } else if (this.url.indexOf('deals') !== -1) {
        this.showToDealButton = false;
        this.backUrl = `/deals/${this.dealService.statusDeal}/${params['id']}`;
      } else if (this.url.indexOf('mounts') !== -1) {
        this.showToDealButton = false;
        this.backUrl = `/mounts/${this.mountService.statusMount}/${params['mount_id']}`;
        this.backUrl += `/deal/${params['id']}`;
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

  sendComment(comment: string) {
    this.measurementService.measurementComment(this.id, comment)
      .subscribe(next => {
        this.measurement.comments.push(next);
        this.flag = true;
      }, error => {
        alert('Комментарий не отправлен');
      });
  }

  openPicture(idPicture: number) {
    this.picture = this.measurement.pictures[idPicture];
    this.showPicture = true;
  }

  closePicture() {
    this.picture = null;
  }

  deletePicture(id) {
    this.showDeletePhotoDialog = true;
    this.photoDeleteID = id;
  }

  adminCheck() {
    if ((this.userType === 4) || (this.userType === 5)) {
      return true;
    }
  }

  ngOnDestroy(): void {
    if (this.subscribeOnSocket) {
      this.subscribeOnSocket.unsubscribe();
    }
  }
}
