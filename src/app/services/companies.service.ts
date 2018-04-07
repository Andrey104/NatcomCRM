import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CompaniesPage} from '../models/company/companies_page';
import {Company} from '../models/company';
import {BaseApi} from '../core/base-api';

@Injectable()
export class CompaniesService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }
  getCompanies(page?: string): Observable<CompaniesPage> {
    return this.getPage(`companies/`, page);
  }
  addCompany(company: Company): Observable<Company> {
    return this.post(`companies/`, company);
  }
  editCompany(company: Company): Observable<Company> {
    return this.put(`companies/${company.id}/`, company);
  }
}
