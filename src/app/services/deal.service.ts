import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {DealPage} from '../models/deal/deals';
import {DealResult} from '../models/deal/deal_result';
import {BaseApi} from '../core/base-api';
import {CompanyPage} from '../models/company/company-page';
import {NewDeal} from '../models/deal/new_deal';


@Injectable()
export class DealService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }


  /** GET deals from the server */
  getDeals(page: number, status: string): Observable<DealPage> {
    return this.get(`deals?page=${page.toString()}&&${status}`);
  }

  getDealById(idDeal: number): Observable<DealResult> {
    return this.get(`deals/${idDeal.toString()}`);
  }

  getFilterDeals(page: number, text: string): Observable<DealPage> {
    return this.get(`deals/search?page=${page.toString()}&&text=${text}`);
  }

  dealComment(idDeal: number, comment: string): Observable<Object> {
    return this.post(`deals/${idDeal}/comment/`, {text: comment});
  }

  getCompanies(): Observable<CompanyPage> {
    return this.get(`companies`);
  }

  newDeal(newDeal: NewDeal): Observable<DealResult> {
    return this.post(`deals/`, newDeal);
  }

  dealComplete(idDeal: number): Observable<Object> {
    return this.post(`deals/${idDeal}/close/`);
  }

  dealReject(idDeal: number, cause: number, comment: string): Observable<Object> {
    if (comment === '') {
      comment = null;
    }
    console.log(comment);
    console.log(cause);
    return this.post(`deals/${idDeal}/reject/`, {cause: cause, comment: comment});
  }

  dealPayment(idDeal: number, nonCash: string, date: string, receiver: string, sum: number): Observable<Object> {
    console.log(nonCash);
    let non_cash: boolean;
    if (nonCash == '0') {
      non_cash = false;
    } else {
      non_cash = true;
    }
    return this.post(`deals/${idDeal}/payment/`, {sum: sum, date: date, receiver: receiver, non_cash: non_cash});
  }

  dealDiscount(idDeal: number, after: number, comment: string): Observable<Object> {
    return this.post(`deals/${idDeal}/discount/`, {after, comment});
  }


}
