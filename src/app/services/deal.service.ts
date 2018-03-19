import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {DealPage} from '../models/deal/deals';
import {DealResult} from '../models/deal/deal_result';
import {BaseApi} from '../core/base-api';
import {CompanyPage} from '../models/company/company-page';


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

  newDeal(companyId: number, paymentType: boolean, address: string, addressComment: string): Observable<any> {
    const data = {
      company: companyId,
      non_cash: paymentType,
      address: address,
      address_comment: addressComment,
      clients: [{
        client: 1
      }]
    };
    return this.post(`deals/`, data);
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

  /*dealDiscount(id, after, comment): Observable<Object> {
    const discount = {'after': after, 'comment': comment};
    return this.http.post<Object>(this.dealsUrl + id + '/discount/', discount,
      {headers: new HttpHeaders().set('Authorization', 'token ' + this.token())}
    ).pipe(
      tap((_: Object) => this.log(`defered`)),
      catchError(this.handleError<Object>('addHero'))
    );
  }*/

}
