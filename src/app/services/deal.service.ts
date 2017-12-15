import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Deal } from '../models/deal';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DealService {

  private dealsUrl = 'http://188.225.46.31/api/deals';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET deals from the server */
  getDeals (): Observable<Deal[]> {
    return this.http.get<Deal[]>(this.dealsUrl, {
      headers: new HttpHeaders().set('Authorization', 'token '+ this.token()),
    })
      .pipe(
        tap(deals => this.log(`fetched deals`)),
        catchError(this.handleError('getDeals', []))
      );
  }



  /** GET deal by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Deal> {
    const url = `${this.dealsUrl}/?id=${id}`;
    return this.http.get<Deal[]>(url)
      .pipe(
        map(deals => deals[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} deal id=${id}`);
        }),
        catchError(this.handleError<Deal>(`getDeal id=${id}`))
      );
  }

  /** GET deal by id. Will 404 if id not found */
  getDeal(id: number): Observable<Deal> {
    const url = `${this.dealsUrl}/${id}`;
    return this.http.get<Deal>(url).pipe(
      tap(_ => this.log(`fetched deal id=${id}`)),
      catchError(this.handleError<Deal>(`getDeal id=${id}`))
    );
  }

  /* GET orders whose name contains search term */
  searchHeroes(term: string): Observable<Deal[]> {
    if (!term.trim()) {
      // if not search term, return empty order array.
      return of([]);
    }
    return this.http.get<Deal[]>(`api/orders/?name=${term}`).pipe(
      tap(_ => this.log(`found orders matching "${term}"`)),
      catchError(this.handleError<Deal[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new order to the server */
  addHero (deal: Deal): Observable<Deal> {
    return this.http.post<Deal>(this.dealsUrl, deal, httpOptions).pipe(
      tap((deal: Deal) => this.log(`added deal w/ id=${deal.id}`)),
      catchError(this.handleError<Deal>('addHero'))
    );
  }

  /** DELETE: delete the order from the server */
  deleteHero (deal: Deal | number): Observable<Deal> {
    const id = typeof deal === 'number' ? deal : deal.id;
    const url = `${this.dealsUrl}/${id}`;

    return this.http.delete<Deal>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted deal id=${id}`)),
      catchError(this.handleError<Deal>('deleteHero'))
    );
  }

  /** PUT: update the order on the server */
  updateHero (deal: Deal): Observable<any> {
    return this.http.put(this.dealsUrl, deal, httpOptions).pipe(
      tap(_ => this.log(`updated deal id=${deal.id}`)),
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
