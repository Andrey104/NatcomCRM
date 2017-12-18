import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Orders } from '../models/orders/order';
import { MessageService } from './message.service';

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
    return this.http.get<Orders>(url, {
      headers: new HttpHeaders().set('Authorization', 'token '+ this.token()),
      params: new HttpParams().set('page', page)
    }).pipe(
      tap(_ => this.log(`fetched order`)),
      catchError(this.handleError<Orders>(`getDeals`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  private token(){
    return localStorage.getItem('token')
  }


}
