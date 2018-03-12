import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { DealPage } from '../models/deal/deals';
import { MessageService } from './message.service';
import {DealResult} from '../models/deal/deal_result';
import {Orders} from '../models/orders/order';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DealService {

  private dealsUrl = 'http://188.225.46.31/api/deals/';  // URL to web api
  private quantity = 10;
  private offset = 10;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }



  /** GET deals from the server */
  getDeals(status, page): Observable<DealPage> {

   let params = new HttpParams();
    params = params.append('page', page);
    if (status !== undefined) {
      params = params.append('status', status);
    }
    const url = this.dealsUrl;
    return this.http.get<DealPage>(url, {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token()),
      params: params,
    });
  }
  getDealById(id: number): Observable<DealResult> {
    return this.http.get<DealResult>(this.dealsUrl + id, {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token())
    });
  }
  getFilterDeals(page: number, text: string): Observable<DealPage> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('text', text);
    return this.http.get<DealPage>(this.dealsUrl + 'search', {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token()),
      params: params
    }).pipe(
      tap(( _: DealPage) => this.log(`defered`)),
      catchError(this.handleError<DealPage>('addHero'))
    );
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  private token() {
    return localStorage.getItem('token');
  }
  dealComment(id, comment): Observable<Object> {
    return this.http.post<Object>(this.dealsUrl + id + '/comment/', {'text': comment},
      {headers: new HttpHeaders().set('Authorization', 'token ' + this.token())}
      ).pipe(
      tap(( _: Object) => this.log(`defered`)),
      catchError(this.handleError<Object>('addHero'))
    );
  }
  dealDiscount(id, after, comment): Observable<Object> {
    const discount = {'after': after, 'comment': comment };
    return this.http.post<Object>(this.dealsUrl + id + '/discount/', discount,
      {headers: new HttpHeaders().set('Authorization', 'token ' + this.token())}
      ).pipe(
      tap(( _: Object) => this.log(`defered`)),
      catchError(this.handleError<Object>('addHero'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
