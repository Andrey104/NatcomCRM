import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Orders } from '../models/orders/order';
import { MessageService } from './message.service';
import {OrderResult} from '../models/orders/order_result';
import {resolveReflectiveProviders} from '@angular/core/src/di/reflective_provider';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OrderService {

  private ordersUrl = 'http://188.225.46.31/api/orders';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET orders from the server */
  getOrders(page): Observable<Orders> {
    const url = this.ordersUrl;
    let  params = new HttpParams();
    params = params.append('page', page);
    params = params.append('status', '0');
    params = params.append('status', '2');
    return this.http.get<Orders>(url, {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token()),
      params: params
    }).pipe(
      tap(_ => this.log(`fetched order`)),
      catchError(this.handleError<Orders>(`getDeals`))
    );
  }
  getOrderById(id: number): Observable<OrderResult> {
    return this.http.get<OrderResult>(this.ordersUrl + '/' + id, {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token())
    }).pipe(
      tap(_ => this.log(`fetched order`)),
      catchError(this.handleError<OrderResult>(`getDeals`))
    );
  }
  getFilterOrders(search): Observable<Orders> {
    return this.http.get<Orders>('http://188.225.46.31/api/orders/search', {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token()),
      params: new HttpParams().set('text', search)
    });
  }

  deferOrder(cause, comment: string, id: string): Observable<Object> {
    const defer = {'cause': cause, 'comment': comment};
    return this.http.post<Object>(this.ordersUrl + '/' + id + '/defer/', defer, {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token()),
    }).pipe(
      tap((defer: Object) => this.log(`defered`)),
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


  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  private token() {
    return localStorage.getItem('token');
  }

}
