import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DealService} from '../../services/deal.service';
import {Company} from '../../models/company';
import {Subscription} from 'rxjs/Subscription';
import {CompanyPage} from '../../models/company/company-page';
import {NgForm} from '@angular/forms';
import {MeasurementService} from '../../services/measurement.service';
import {OrderService} from '../../services/order.service';
import {OrderResult} from '../../models/orders/order_result';
import {Client} from '../../models/client';
import {Phone} from '../../models/phone';
import {NewDeal} from '../../models/deal/new_deal';

@Component({
  selector: 'app-new-deal-page',
  templateUrl: './new-deal-page.component.html',
  styleUrls: ['./new-deal-page.component.css']
})
export class NewDealPageComponent implements OnInit, OnDestroy {
  companies: Company[] = [];
  clients: Client[] = [];
  subOnCompanies: Subscription;
  subOnDeal: Subscription;
  subOnMeasurement: Subscription;
  showDialog = false;
  defaultCompany: number;
  visibleMeasurement = {show: false, icon: 'add', message: 'Добавить замер'};
  order: OrderResult;

  constructor(private dealService: DealService,
              private measurementService: MeasurementService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    if (this.orderService.getOrder()) {
      this.getOrder();
    } else {
      this.subscribeOnGetCompanies();
    }
  }

  getOrder() {
    this.order = this.orderService.getOrder();
    this.companies.push(this.order.company);
    this.defaultCompany = this.companies[0].id;
    this.clients.push(this.order.client);
    this.orderService.setOrder(null);
  }

  subscribeOnGetCompanies() {
    this.subOnCompanies = this.dealService.getCompanies()
      .subscribe((companies: CompanyPage) => {
        this.companies = companies.results;
        this.defaultCompany = this.companies[0].id;
      });
  }

  showMeasurement() {
    this.visibleMeasurement.show = !this.visibleMeasurement.show;
    if (this.visibleMeasurement.icon === 'add') {
      this.visibleMeasurement.icon = 'remove';
      this.visibleMeasurement.message = 'Удалить замер';
    } else {
      this.visibleMeasurement.icon = 'add';
      this.visibleMeasurement.message = 'Добавить замер';
    }
  }

  submitForm(form: NgForm) {
    const companyId = Number(form.form.value.company);
    const payment = Boolean(form.form.value.payment);
    const address = form.form.value.address;
    const comment = form.form.value.addressComment;
    const date = form.form.value.calendar;
    const commentTime = form.form.value.commentTime;
    console.log(this.clients);
    const newDeal = new NewDeal(companyId, payment, address, comment, this.clients);
    this.subOnDeal = this.dealService.newDeal(newDeal)
      .subscribe((deal) => {
        console.log(deal);
        if (deal !== null && date !== undefined && commentTime !== undefined) {
          this.subOnMeasurement =
            this.measurementService.newMeasurement(deal.id, deal.non_cash, date, commentTime)
              .subscribe((measurement) => {
                this.showMeasurement();
                console.log(measurement);
              });
        }
      });
    form.reset();
    // this.unSub();
  }

  addNewClient(client: Client) {
    this.clients.push(client);
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
