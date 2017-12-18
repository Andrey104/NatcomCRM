import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { DealPage } from '../models/deal/deals';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DealService {

  private dealsUrl = 'http://188.225.46.31/api/deals/?limit=10&offset=30';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  /** GET deals from the server */
  getDeals(): Observable<DealPage> {
    const url = this.dealsUrl;
    return this.http.get<DealPage>(url, {
      headers: new HttpHeaders().set('Authorization', 'token '+ this.token()),
    }).pipe(
      tap(_ => this.log(`fetched order`)),
      catchError(this.handleError<DealPage>(`getDeals`))
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  private token(){
    return localStorage.getItem('token');
  }


}
