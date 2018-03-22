import { Component, OnInit } from '@angular/core';
import {log} from 'util';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Company} from '../../models/company';
import {CompaniesService} from '../../services/companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['../settings-page.component.css']
})
export class CompaniesComponent implements OnInit {
  companies: Company[];
  companyModalState: { open: Boolean, company?: Company } = {open: false, company: null};
  modal: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private installerService: CompaniesService) {
  }

  ngOnInit() {
    this.show();
  }
  show() {
    this.loadCompanies(null);
  }

  loadCompanies(page?: number): void {
    if (page == null) {
      page = 1;
      this.installerService.getCompanies()
        .subscribe(companies => {
          this.companies = companies.results;
          if (companies.next != null) {
            this.loadCompanies(page + 1);
          }
        }, error2 => {
          log(error2);
        });
    } else {
      this.installerService.getCompanies(page.toString())
        .subscribe(companies => {
          this.companies = this.companies.concat(companies.results);
          if (companies.next != null) {
            this.loadCompanies(page + 1);
          }
        }, error2 => {
          log(error2);
        });
    }
  }

  openCompanyModal(company?: Company) {
    this.companyModalState = {open: true, company: company};
    this.openModal(true);
  }

  editCompanyModalClose(successfully) {
    if (successfully) {
      this.show();
    }
    this.companyModalState.open = false;
    this.openModal(false);
  }

  openModal(open: Boolean) {
    this.modal.next(open);
  }

}
