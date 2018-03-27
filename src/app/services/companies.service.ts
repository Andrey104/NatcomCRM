import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {MessageService} from './message.service';
import {catchError, tap} from 'rxjs/operators';
import {CompaniesPage} from '../models/company/companies_page';
import {Company} from '../models/company';

@Injectable()
export class CompaniesService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'token ' + this.token()})
  };
  private urlCompany = 'http://188.225.46.31/api/companies/';

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  getCompanies(page?: string): Observable<CompaniesPage> {
    if (page == null) {
      page = '1';
    }
    let params = new HttpParams();
    params = params.append('page', page);
    return this.http.get<CompaniesPage>(this.urlCompany, {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token()),
      params: params
    });
  }

  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.urlCompany, company, this.httpOptions).pipe(
      tap((returnCompany: Company) => this.log(`added installer w/ id=${returnCompany.id}`)),
      catchError(this.handleError<Company>('addInstaller'))
    );
  }

  editCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(this.urlCompany + company.id + '/', company, this.httpOptions).pipe(
      tap((returnCompany: Company) => this.log(`edited installer w/ id=${returnCompany.id}`)),
      catchError(this.handleError<Company>('editInstaller'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
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
