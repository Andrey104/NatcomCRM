import {AfterViewChecked, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DealService} from '../../services/deal.service';
import {DealResult} from '../../models/deal/deal_result';
import {UtilsService} from '../../services/utils.service';
import {Client} from '../../models/client';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DealMeasurement} from '../../models/deal/deal_measurement';
import {Payment} from '../../models/payment';
import {DealDiscount} from '../../models/deal/deal_discount';
import {DealMount} from '../../models/deal/deal_mount';
import {Subscription} from 'rxjs/Subscription';
import {DOCUMENT} from '@angular/common';
import {MountService} from '../../services/mount.service';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-deal-detail',
  templateUrl: './deal-detail.component.html',
  styleUrls: ['./deal-detail.component.css'],
})
export class DealDetailComponent implements OnInit, AfterViewChecked {
  flag = false;
  private id;
  page = 1;
  select;
  clientInfo = false;
  client: Client;
  deal: DealResult;
  showEditButtons = false;
  loadPage: boolean;
  showCompleteDialog = false;
  showRejectDialog = false;
  showMeasurementDialog = false;
  showPaymentDialog = false;
  showDiscountDialog = false;
  showMountDialog = false;
  showManagerDialog = false;
  showEditDialog = false;
  showEditClient = false;
  needSubscribe = true;
  subOnNewClientToDeal: Subscription;
  updateList: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  url: string;
  backUrl: string;
  backInfo: string;

  constructor(private activatedRoute: ActivatedRoute,
              private dealService: DealService,
              private utils: UtilsService,
              @Inject(DOCUMENT) private document: Document,
              private mountService: MountService,
              private orderService: OrderService) {
    this.url = this.document.location.href;
  }

  ngOnInit() {
    this.select = 0;
    this.subscribeDealId();
  }

  ngAfterViewChecked(): void {
    if (this.flag) {
      document.getElementById('page').scrollTop = document.getElementById('page').scrollHeight;
      this.flag = false;
    }
  }

  successEdit() {
    this.loadPage = true;
    this.getDealById();
    this.updateList.next(true);
  }

  successManagerAdded() {
    this.loadPage = true;
    this.getDealById();
    this.updateList.next(true);
  }

  successMountAdded(mount: DealMount) {
    this.loadPage = true;
    this.getDealById();
    this.updateList.next(true);
  }

  successMeasurementAdded(measurement: DealMeasurement) {
    this.loadPage = true;
    this.getDealById();
    this.updateList.next(true);
  }

  successPaymentAdded(payment: Payment) {
    this.loadPage = true;
    this.getDealById();
  }

  successDiscountAdded(discount: DealDiscount) {
    this.loadPage = true;
    this.getDealById();
  }

  updateDeal() {
    this.updateList.next(true);
    this.loadPage = true;
    this.getDealById();
  }

  successDealClient(client: Client) {
    this.subOnNewClientToDeal = this.dealService.newClientToDeal(this.id, client.id)
      .subscribe((responseClient) => {
        if (responseClient) {
          this.getDealById();
        }
      }, (err) => {
        if (err.status === 200) {
          this.getDealById();
        }
      }, () => {
        this.subOnNewClientToDeal.unsubscribe();
      });
  }

  subscribeDealId(): void {
    this.activatedRoute.params.subscribe(params => {
      if (this.url.indexOf('mounts') !== -1) {
        this.backUrl = `/mounts/${this.mountService.statusMount}/${params['mount_id']}`;
        this.backInfo = 'Назад к монтажу';
      } else if (this.url.indexOf('client_deal') !== -1) {
        this.backUrl = `/orders/${this.orderService.getOrderStatus()}/${params['id']}/client/${params['client_id']}`;
        this.backInfo = 'Назад к клиенту';
      }
      this.id = params['id'];
      this.loadPage = true;
      this.getDealById();
    });
  }

  getDealById(): void {
    this.dealService.getDealById(this.id)
      .subscribe((deal) => {
        this.deal = deal;
        this.showEditButtons = this.utils.showEditButtons(String(this.deal.user.id));
        this.loadPage = false;
      });
  }

  sendComment(comment: string) {
    this.dealService.dealComment(this.id, comment).subscribe(
      next => {
        this.deal.comments.push(next);
        this.flag = true;
      }, error => {
        console.log(error.error);
      });
  }

  getDealStatus(status) {
    return this.utils.statusDeal(status);
  }

  openClientInfo(idClient: number) {
    this.clientInfo = true;
    this.client = this.deal.clients[idClient];
  }

  closeClientInfo() {
    this.clientInfo = false;
    this.client = null;
  }
}
