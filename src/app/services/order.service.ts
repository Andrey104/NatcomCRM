import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Order } from '../models/order';
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
  getOrders (): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl, {
      headers: new HttpHeaders().set('Authorization', 'token '+ this.token()),
    })
      .pipe(
        tap(orders => this.log(`fetched orders`)),
        catchError(this.handleError('getOrders', []))
      );
  }



  /** GET order by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Order> {
    const url = `${this.ordersUrl}/?id=${id}`;
    return this.http.get<Order[]>(url)
      .pipe(
        map(orders => orders[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} order id=${id}`);
        }),
        catchError(this.handleError<Order>(`getOrder id=${id}`))
      );
  }

  /** GET order by id. Will 404 if id not found */
  getOrder(id: number): Observable<Order> {
    const url = `${this.ordersUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap(_ => this.log(`fetched order id=${id}`)),
      catchError(this.handleError<Order>(`getOrder id=${id}`))
    );
  }

  /* GET orders whose name contains search term */
  searchHeroes(term: string): Observable<Order[]> {
    if (!term.trim()) {
      // if not search term, return empty order array.
      return of([]);
    }
    return this.http.get<Order[]>(`api/orders/?name=${term}`).pipe(
      tap(_ => this.log(`found orders matching "${term}"`)),
      catchError(this.handleError<Order[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new order to the server */
  addHero (order: Order): Observable<Order> {
    return this.http.post<Order>(this.ordersUrl, order, httpOptions).pipe(
      tap((order: Order) => this.log(`added order w/ id=${order.id}`)),
      catchError(this.handleError<Order>('addHero'))
    );
  }

  /** DELETE: delete the order from the server */
  deleteHero (order: Order | number): Observable<Order> {
    const id = typeof order === 'number' ? order : order.id;
    const url = `${this.ordersUrl}/${id}`;

    return this.http.delete<Order>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted order id=${id}`)),
      catchError(this.handleError<Order>('deleteHero'))
    );
  }

  /** PUT: update the order on the server */
  updateHero (order: Order): Observable<any> {
    return this.http.put(this.ordersUrl, order, httpOptions).pipe(
      tap(_ => this.log(`updated order id=${order.id}`)),
      catchError(this.handleError<any>('updateHero'))
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
