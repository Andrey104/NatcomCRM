import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';


import {DealPage} from '../models/deal/deals';
import {MessageService} from './message.service';
import {DealResult} from '../models/deal/deal_result';
import {BaseApi} from '../core/base-api';


@Injectable()
export class DealService extends BaseApi {

  constructor(public http: HttpClient,
              private messageService: MessageService) {
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
    /*let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('text', text);
    return this.http.get<DealPage>(this.dealsUrl + 'search', {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token()),
      params: params
    }).pipe(
      tap((_: DealPage) => this.log(`defered`)),
      catchError(this.handleError<DealPage>('addHero'))
    );*/
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  dealComment(idDeal: number, comment: string): Observable<Object> {
    return this.post(`deals/${idDeal}/comment/`, {text: comment});
    /*return this.http.post<Object>(this.dealsUrl + id + '/comment/', {'text': comment},
      {headers: new HttpHeaders().set('Authorization', 'token ' + this.token())}
    ).pipe(
      tap((_: Object) => this.log(`defered`)),
      catchError(this.handleError<Object>('addHero'))
    );*/
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
