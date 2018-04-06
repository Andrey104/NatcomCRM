import {AfterViewChecked, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DealService} from '../../services/deal.service';
import {DealResult} from '../../models/deal/deal_result';
import {UtilsService} from '../../services/utils.service';
import {Client} from '../../models/clients/client';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DealMeasurement} from '../../models/deal/deal_measurement';
import {Payment} from '../../models/payment';
import {DealDiscount} from '../../models/deal/deal_discount';
import {DealMount} from '../../models/deal/deal_mount';
import {Subscription} from 'rxjs/Subscription';
import {DOCUMENT} from '@angular/common';
import {MountService} from '../../services/mount.service';
import {OrderService} from '../../services/order.service';
import {MeasurementService} from '../../services/measurement.service';
import {WebsocketService} from '../../services/websocket.service';

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
  client: Client;
  clientInfo: Client = null;
  clientChange: Client = null;
  changeClientNumber: number;
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
  showClientDialog = false;
  showChangeClientDialog = false;
  needSubscribe = true;
  subOnNewClientToDeal: Subscription;
  dealClients: Client[] = [];
  updateList: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  url: string;
  ws;
  backUrl: string;
  backInfo: string;
  confirmModal = {showConfirmDialog: false, confirmMessage: 'Замер не может быть добавлен без адреса. Хотите добавить адрес к сделке?'};

  constructor(private activatedRoute: ActivatedRoute,
              private dealService: DealService,
              private utils: UtilsService,
              @Inject(DOCUMENT) private document: Document,
              private mountService: MountService,
              private orderService: OrderService,
              private measurementService: MeasurementService,
              private webSocketService: WebsocketService) {
    this.url = this.document.location.href;
  }


  ngOnInit() {
    this.select = 0;
    this.subscribeDealId();
    this.ws = this.webSocketService.makeSocketConnection();
    this.webSocketService.message.subscribe((response) => {
      switch (response.event) {
        case 'on_comment_deal': {
          if (response.data.comment.user.id !== Number(localStorage.getItem('id_manager'))) {
            this.deal.comments.push(response.data.comment);
          }
          break;
        }
      }
    });
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

  showMeasurementModal() {
    if (this.deal.address !== null) {
      this.showMeasurementDialog = !this.showMeasurementDialog;
    } else {
      this.confirmModal.showConfirmDialog = true;
    }
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

  showAddClient() {
    for (const client of this.deal.clients) {
      this.dealClients.push(client.client);
    }
    this.showEditClient = !this.showEditClient;
  }

  clientInfoDialog(clientNumber: number) {
    this.changeClientNumber = clientNumber;
    this.showClientDialog = !this.showClientDialog;
    this.clientInfo = JSON.parse(JSON.stringify(this.deal.clients[clientNumber].client));
  }

  successClientInfoDialog(client: Client) {
    if (client !== null) {
      this.clientChange = client;
      this.showChangeClientDialog = true;
    }
    this.clientInfo = null;
  }

  successClientChangeDialog(client: Client) {
    if (client !== null) {
      this.deal.clients[this.changeClientNumber].client = client;
    }
    this.clientInfoDialog(this.changeClientNumber);
    this.clientChange = null;
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

  confirmModalAnswer(userAnswer: boolean) {
    if (userAnswer) {
      this.showEditDialog = !this.showEditDialog;
    }
  }

  subscribeDealId(): void {
    this.activatedRoute.params.subscribe(params => {
      if (this.url.indexOf('mounts') !== -1) {
        this.backUrl = `/mounts/${this.mountService.statusMount}/${params['mount_id']}`;
        this.backInfo = 'Назад к монтажу';
      } else if (this.url.indexOf('client_deal') !== -1) {
        this.backUrl = `/orders/${this.orderService.getOrderStatus()}/${params['id']}/client/${params['client_id']}`;
        this.backInfo = 'Назад к клиенту';
      } else if (this.url.indexOf('measurements') !== -1) {
        this.backUrl = `/measurements/${this.measurementService.measurementStatus}/${params['measurement_id']}`;
        this.backInfo = 'Назад к замеру';
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
}
