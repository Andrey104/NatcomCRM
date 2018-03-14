import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {DealPage} from '../models/deal/deals';
import {DealResult} from '../models/deal/deal_result';
import {BaseApi} from '../core/base-api';


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
