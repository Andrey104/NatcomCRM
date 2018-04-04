import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DealService} from '../../services/deal.service';
import {Company} from '../../models/company';
import {Subscription} from 'rxjs/Subscription';
import {CompanyPage} from '../../models/company/company-page';
import {NgForm} from '@angular/forms';
import {MeasurementService} from '../../services/measurement.service';
import {OrderService} from '../../services/order.service';
import {OrderResult} from '../../models/orders/order_result';
import {Client} from '../../models/clients/client';
import {NewDeal} from '../../models/deal/new_deal';
import {ActivatedRoute, Router} from '@angular/router';
import {NewMeasurement} from '../../models/measurement/new-measurement';
import {DealResult} from '../../models/deal/deal_result';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-new-deal-page',
  templateUrl: './new-deal-page.component.html',
  styleUrls: ['./new-deal-page.component.css']
})
export class NewDealPageComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  companies: Company[] = [];
  clients: Client[] = [];
  changeClient: Client = null;
  clientInfo: Client = null;
  changeClientNumber: number;
  subOnCompanies: Subscription;
  subOnDeal: Subscription;
  subOnMeasurement: Subscription;
  showEditButtons = true;
  showDialog = false;
  showClientDialog = false;
  showChangeClientDialog = false;
  defaultCompany: number;
  visibleMeasurement = {show: false, icon: 'add_circle_outline', message: 'Добавить замер'};
  order: OrderResult;
  deal: DealResult;
  isRequest = true;
  orderId: number;
  orderStatus;
  subOnOrder: Subscription;
  eventMessage = '';
  eventRoute = '';

  constructor(private dealService: DealService,
              private measurementService: MeasurementService,
              private orderService: OrderService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private chatService: ChatService) {
    this.chatService.messages.subscribe(msg => {
      this.parseEvent(msg);
    });
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params['id']) {
      this.getOrder();
    } else {
      this.subscribeOnGetCompanies();
    }
    // else if (this.dealService.deal) {
    //     this.companies = this.dealService.companies;
    //     this.defaultCompany = this.dealService.deal.company;
    //     this.clients = this.dealService.deal.clients;
    //     this.form.form.patchValue({
    //       address: this.dealService.deal.address,
    //       description: this.dealService.deal.description
    //     });
    //     this.clients = this.dealService.deal.clients;
    //   }
  }

  parseEvent(msg) {
    switch (msg.data.event) {
      case 'on_create_order': {
        this.eventMessage = 'Новая заявка';
        this.eventRoute = `/orders/all/${msg.data.data.order_id}`;
        break;
      }
    }
  }

  getOrder() {
    this.orderStatus = this.orderService.getOrderStatus();
    this.orderId = this.activatedRoute.snapshot.params['id'];
    if (this.orderService.getOrder() === undefined) {
      this.subOnOrder = this.orderService.getOrderById(this.orderId)
        .subscribe((orderPage) => {
          this.order = orderPage;
          this.clients.push(this.order.client);
          this.companies.push(this.order.company);
          this.defaultCompany = this.companies[0].id;
          document.getElementById('select').setAttribute('disabled', 'disabled');
        }, (err) => {
          console.log(err.message);
        }, () => {
          this.subOnOrder.unsubscribe();
        });
    } else {
      this.getOrderByService();
    }
  }

  getOrderByService() {
    this.order = this.orderService.getOrder();
    this.companies.push(this.order.company);
    this.defaultCompany = this.companies[0].id;
    this.clients.push(this.order.client);
    this.orderService.setOrder(null);
    document.getElementById('select').setAttribute('disabled', 'disabled');
  }

  subscribeOnGetCompanies() {
    this.subOnCompanies = this.dealService.getCompanies()
      .subscribe((companies: CompanyPage) => {
        this.companies = companies.results;
        this.defaultCompany = this.companies[0].id;
      });
  }

  showMeasurement() {
    if (this.form.form.value.address !== '') {
      this.visibleMeasurement.show = !this.visibleMeasurement.show;
      if (this.visibleMeasurement.icon === 'add_circle_outline') {
        this.visibleMeasurement.icon = 'remove_circle_outline';
        this.visibleMeasurement.message = 'Удалить замер';
      } else {
        this.visibleMeasurement.icon = 'add_circle_outline';
        this.visibleMeasurement.message = 'Добавить замер';
      }
    } else {
      alert('Нельзя добавить замер в сделку без адреса. Укажите адрес.');
    }
  }

  submitForm() {
    this.isRequest = false;
    this.sendNewDeal();
  }

  sendNewDeal() {
    const newDeal = this.getNewDeal();
    if (this.order) {
      this.subOnDeal = this.dealService.newDealByOrder(this.orderId, newDeal)
        .subscribe((deal) => {
          this.deal = deal;
          this.sendMeasurement();
        });
    } else {
      this.subOnDeal = this.dealService.newDeal(newDeal)
        .subscribe((deal) => {
          this.deal = deal;
          this.sendMeasurement();
        });
    }
  }

  sendMeasurement() {
    const newMeasurement = this.getNewMeasurement(this.deal.payment_type);
    if (this.deal !== null && newMeasurement.date !== undefined) {
      this.subOnMeasurement =
        this.measurementService.newMeasurement(this.deal.id, newMeasurement)
          .subscribe((measurement) => {
            this.showMeasurement();
            this.resetForm();
          });
    } else {
      this.resetForm();
    }
  }

  getNewDeal(): NewDeal {
    const companyId = Number(this.form.form.value.company);
    const payment = Number(this.form.form.value.payment);
    const address = this.form.form.value.address;
    const description = this.form.form.value.description;
    const comment = this.form.form.value.addressComment;
    const newDeal = new NewDeal(companyId, payment, description, address, comment, this.clients);
    return newDeal;
  }

  getNewMeasurement(paymentType: number): NewMeasurement {
    const date = this.form.form.value.calendar;
    const commentTime = this.form.form.value.commentTime;
    const descriptionMeasurement = this.form.form.value.descriptionMeasurement;
    const newMeasurement = new NewMeasurement(paymentType, date, commentTime, descriptionMeasurement);
    return newMeasurement;
  }

  addNewClient(client: Client) {
    this.clients.push(client);
  }

  clientInfoDialog(clientNumber: number) {
    this.dealService.companies = this.companies;
    this.dealService.deal = this.getNewDeal();
    this.changeClientNumber = clientNumber;
    this.showClientDialog = !this.showClientDialog;
    this.clientInfo = JSON.parse(JSON.stringify(this.clients[clientNumber]));
  }

  successClientInfoDialog(client: Client) {
    if (client !== null) {
      this.changeClient = client;
      this.showChangeClientDialog = true;
    }
    this.clientInfo = null;
  }

  successChangeClient(client: Client) {
    if (client !== null) {
      this.clients[this.changeClientNumber] = client;
    }
    this.clientInfoDialog(this.changeClientNumber);
    this.changeClient = null;
  }

  resetForm() {
    this.isRequest = true;
    this.unSub();
    this.form.reset();
    this.router.navigate(['/deals/all/' + this.deal.id.toString()]);
  }

  unSub() {
    if (this.subOnCompanies) {
      this.subOnCompanies.unsubscribe();
    }
    if (this.subOnDeal) {
      this.subOnDeal.unsubscribe();
    }
    if (this.subOnMeasurement) {
      this.subOnMeasurement.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.unSub();
  }

}
