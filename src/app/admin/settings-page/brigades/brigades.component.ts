import { Component, OnInit } from '@angular/core';
import {Company} from '../../../models/company';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CompaniesService} from '../../../services/companies.service';
import {log} from 'util';

@Component({
  selector: 'app-brigades',
  templateUrl: './brigades.component.html',
  styleUrls: ['../settings-page.component.css']
})
export class BrigadesComponent implements OnInit {
  companies: Object[];
  modalState: { open: Boolean, company?: Company } = {open: false, company: null};
  modal: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private installerService: CompaniesService) {
  }

  ngOnInit() {
    this.show();
  }
  show() {
    this.load(null);
  }

  load(page?: number): void {
    if (page == null) {
      page = 1;
      this.installerService.getCompanies()
        .subscribe(companies => {
          this.companies = companies.results;
          if (companies.next != null) {
            this.load(page + 1);
          }
        }, error2 => {
          log(error2);
        });
    } else {
      this.installerService.getCompanies(page.toString())
        .subscribe(companies => {
          this.companies = this.companies.concat(companies.results);
          if (companies.next != null) {
            this.load(page + 1);
          }
        }, error2 => {
          log(error2);
        });
    }
  }

  openModal(company?: Company) {
    this.modalState = {open: true, company: company};
    this.modal.next(true);
  }

  modalClose(successfully) {
    if (successfully) {
      this.show();
    }
    this.modalState.open = false;
    this.modal.next(false);
  }

}
