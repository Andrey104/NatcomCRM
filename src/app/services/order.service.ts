import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {Orders} from '../models/orders/order';
import {MessageService} from './message.service';
import {OrderResult} from '../models/orders/order_result';
import {BaseApi} from '../core/base-api';
import {Subject} from 'rxjs/Subject';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class OrderService extends BaseApi {
  private order: OrderResult;
  private orderStatus;

  constructor(public http: HttpClient,
              private messageService: MessageService) {
    super(http);
  }

  getOrder(): OrderResult {
    return this.order;
  }

  setOrder(order: OrderResult) {
    this.order = order;
  }

  getOrderStatus() {
    return this.orderStatus;
  }

  setOrderStatus(status: string) {
    this.orderStatus = status;
  }

  /** GET orders from the server */
  getOrders(page: number, status: string): Observable<Orders> {
    return this.get(`orders/?page=${page.toString()}&${status}`);
  }

  getOrderById(idOrder: number): Observable<OrderResult> {
    return this.get(`orders/${idOrder}/`);
  }

  getFilterOrders(page: number, text: string): Observable<Orders> {
    return this.get(`orders/search?page=${page.toString()}&text=${text}`);
  }

  deferOrder(id: string, comment: string, cause: number): Observable<Object> {
    if (comment === '') {
      comment = null;
    }
    const data = {'cause': cause, 'comment': comment};
    return this.post(`orders/${id}/defer/`, data);
  }

  rejectOrder(id: number, comment: string, cause: number): Observable<Object> {
    if (comment === '') {
      comment = null;
    }
    const data = {'cause': cause, 'comment': comment};
    return this.post(`orders/${id}/reject/`, data);
  }

  private handleError<T>(operation = 'operation', result?: T) {
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

}
