import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {DealPage} from '../models/deal/deals';
import {DealResult} from '../models/deal/deal_result';
import {BaseApi} from '../core/base-api';
import {CompanyPage} from '../models/company/company-page';
import {NewDeal} from '../models/deal/new_deal';
import {User} from '../models/user';
import {Managers} from '../models/managers/managers';
import {Client} from '../models/client';


@Injectable()
export class DealService extends BaseApi {
  statusDeal;

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
    return this.post(`deals/${idDeal}/reject/`, {cause: cause, comment: comment});
  }

  dealPayment(idDeal: number, nonCash: string, date: string, receiver: string, sum: number): Observable<Object> {
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

  newMount(dealId: number, date: string, description: string) {
    if (date === undefined || date === '') {
      date = null;
    }
    if (description === undefined || description === '') {
      description = null;
    }

    return this.post(`deals/${dealId}/mount/`, {date, description});
  }

  getManagers(): Observable<Object> {
    return this.get(`managers`);
  }

  setManager(idDeal: number, manager: number): Observable<Object> {
    return this.post(`deals/${idDeal}/set_manager/`, {manager});
  }

  editDeal(idDeal: number, address: string, address_comment: string, description: string): Observable<Object> {
    if (description === '') {
      description = null;
    }
    if (address_comment === '') {
      address_comment = null;
    }
    const data = {
      address_comment,
      address,
      description
    };
    console.log(data.address_comment , 'edit deal');
    return this.patch(`deals/${idDeal}/`, data);
  }

  newClientToDeal(dealId: number, clientId: number): Observable<Client> {
    const data = {client: clientId};
    return this.post(`deals/${dealId.toString()}/add_client/`, data);
  }

}
