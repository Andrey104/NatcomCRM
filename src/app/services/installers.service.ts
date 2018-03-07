import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Installer} from '../models/installers/installer';
import {InstallersPage} from '../models/installers/installers_page';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {of} from 'rxjs/observable/of';


@Injectable()
export class InstallersService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'token ' + this.token()})
  };
  private urlInstaller = 'http://188.225.46.31/api/installers/';

  constructor(private http: HttpClient,
              private messageService: MessageService) {}
  getInstallers(page?: string): Observable<InstallersPage> {
    if (page == null) {
      page = '1';
    }
    let  params = new HttpParams();
    params = params.append('page', page);
    return this.http.get<InstallersPage>(this.urlInstaller, {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token()),
      params: params
    });
  }
  addInstaller (installer: Installer): Observable<Installer> {
    return this.http.post<Installer>(this.urlInstaller, installer, this.httpOptions).pipe(
      tap((returnInstaller: Installer) => this.log(`added installer w/ id=${returnInstaller.id}`)),
      catchError(this.handleError<Installer>('addInstaller'))
    );
  }
  editInstaller (installer: Installer): Observable<Installer> {
    return this.http.put<Installer>(this.urlInstaller + installer.id + '/', installer, this.httpOptions).pipe(
      tap((returnInstaller: Installer) => this.log(`edited installer w/ id=${returnInstaller.id}`)),
      catchError(this.handleError<Installer>('editInstaller'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
  private token() {
    return localStorage.getItem('token');
  }
}


