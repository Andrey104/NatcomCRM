import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DealService} from '../../services/deal.service';
import {Company} from '../../models/company';
import {Subscription} from 'rxjs/Subscription';
import {CompanyPage} from '../../models/company/company-page';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-deal-page',
  templateUrl: './new-deal-page.component.html',
  styleUrls: ['./new-deal-page.component.css']
})
export class NewDealPageComponent implements OnInit, OnDestroy {
  companies: Company[];
  subOnCompanies: Subscription;
  showDialog: false;

  constructor(private orderService: DealService) {
  }

  ngOnInit() {
    this.subscribeOnGetCompanies();
  }

  subscribeOnGetCompanies() {
    this.subOnCompanies = this.orderService.getCompanies()
      .subscribe((companies: CompanyPage) => {
        this.companies = companies.results;
      });
  }

  submitForm(form: NgForm) {
    const address = form.form.value.address;
    const comment = form.form.value.addressComment;
    const companyId = Number(form.form.value.company);
    const payment = Boolean(form.form.value.payment);
    this.orderService.newDeal(companyId, payment, address, comment)
      .subscribe((response) => {
        console.log(response);
      });
  }

  ngOnDestroy() {
    if (this.subOnCompanies) {
      this.subOnCompanies.unsubscribe();
    }
  }

}
