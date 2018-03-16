import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DealService} from '../../services/deal.service';
import {Company} from '../../models/company';
import {Subscription} from 'rxjs/Subscription';
import {CompanyPage} from '../../models/company/company-page';
import {NgForm} from '@angular/forms';
import {MeasurementService} from '../../services/measurement.service';

@Component({
  selector: 'app-new-deal-page',
  templateUrl: './new-deal-page.component.html',
  styleUrls: ['./new-deal-page.component.css']
})
export class NewDealPageComponent implements OnInit, OnDestroy {
  companies: Company[];
  subOnCompanies: Subscription;
  subOnDeal: Subscription;
  subOnMeasurement: Subscription;
  showDialog = false;
  visibleMeasurement = {show: false, icon: 'add', message: 'Добавить замер'};

  constructor(private dealService: DealService,
              private measurementService: MeasurementService) {
  }

  ngOnInit() {
    this.subscribeOnGetCompanies();
  }

  subscribeOnGetCompanies() {
    this.subOnCompanies = this.dealService.getCompanies()
      .subscribe((companies: CompanyPage) => {
        this.companies = companies.results;
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
    const address = form.form.value.address;
    const comment = form.form.value.addressComment;
    const companyId = Number(form.form.value.company);
    const payment = Boolean(form.form.value.payment);
    const date = form.form.value.calendar;
    const commentTime = form.form.value.commentTime;
    console.log(form);
    this.subOnDeal = this.dealService.newDeal(companyId, payment, address, comment)
      .subscribe((deal) => {
        console.log(deal);
        if (deal !== null && date !== undefined && commentTime !== undefined) {
          this.subOnMeasurement =
            this.measurementService.newMeasurement(deal.id, deal.non_cash, date, commentTime)
              .subscribe((measurement) => {
                console.log(measurement);
              });
        }
      });
    this.showMeasurement();
    form.reset();
    // this.unSub();
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
