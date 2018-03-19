import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {InstallersPage} from '../models/installers/installers_page';

@Injectable()
export class BaseApi {
  private baseUrl = 'http://188.225.46.31/api/';

  constructor(public http: HttpClient) {
  }
  private getUrl(url: string = '') {
    return this.baseUrl + url;
  }

  get(url: string = ''): Observable<any> {
    return this.http.get(
      this.getUrl(url), {
        headers: new HttpHeaders().set('Authorization', 'token ' + this.token()),
      }
    );
  }

  post(url: string = '', data: any = {}): Observable<any> {
    return this.http.post(
      this.getUrl(url),
      data,
      {headers: new HttpHeaders().set('Authorization', 'token ' + this.token())}
    );
  }

  getPage(url: string, page: string): Observable<any> {
    if (page == null) {
      page = '1';
    }
    let  params = new HttpParams();
    params = params.append('page', page);
    return this.http.get(
      this.getUrl(url), {
        headers: new HttpHeaders().set('Authorization', 'token ' + this.token()),
        params: params
    });
  }

  private token() {
    return localStorage.getItem('token');
  }
}
