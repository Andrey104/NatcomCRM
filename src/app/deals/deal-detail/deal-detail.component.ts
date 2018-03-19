import {AfterViewChecked, Component, OnInit} from '@angular/core';
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
  loadPage: boolean;
  showCompleteDialog = false;
  showRejectDialog = false;
  showMeasurementDialog = false;
  showPaymentDialog = false;
  showDiscountDialog = false;
  showMountDialog = false;
  needSubscribe = true;
  updateList: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private activatedRoute: ActivatedRoute,
              private dealService: DealService,
              private utils: UtilsService) {
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

  successMountAdded(mount: DealMount) {
    this.deal.mounts.push(mount);
    this.updateList.next(true);
  }

  successMeasurementAdded(measurement: DealMeasurement) {
    this.deal.measurements.push(measurement);
    this.updateList.next(true);
  }

  successPaymentAdded(payment: Payment) {
    this.deal.payments.push(payment);
  }

  successDiscountAdded(discount: DealDiscount) {
    this.deal.discounts.push(discount);
  }

  updateDeal() {
    this.updateList.next(true);
    this.loadPage = true;
    this.getDealById();
  }

  subscribeDealId(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.loadPage = true;
      this.getDealById();
    });
  }

  getDealById(): void {
    this.dealService.getDealById(this.id)
      .subscribe((deal) => {
        this.deal = deal;
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
