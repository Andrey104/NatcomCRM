import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BaseApi {
  private baseUrl = 'api/';

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

  patch(url: string = '', data: any = {}): Observable<any> {
    return this.http.patch(
      this.getUrl(url),
      data,
      {headers: new HttpHeaders().set('Authorization', 'token ' + this.token())}
    );
  }

  post(url: string = '', data?: any): Observable<any> {
    return this.http.post(
      this.getUrl(url),
      data,
      {headers: new HttpHeaders().set('Authorization', 'token ' + this.token())}
    );
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put(
      this.getUrl(url),
      data,
      {headers: new HttpHeaders().set('Authorization', 'token ' + this.token())}
    );
  }

  del(url: string = ''): Observable<any> {
    return this.http.delete(
      this.getUrl(url),
      {headers: new HttpHeaders().set('Authorization', 'token ' + this.token())}
    );
  }

  getPage(url: string, page: string): Observable<any> {
    if (page == null) {
      page = '1';
    }
    let params = new HttpParams();
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
