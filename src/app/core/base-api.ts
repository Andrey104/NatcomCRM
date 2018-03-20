import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

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

  patch(url: string = '', data: any = {}): Observable<any> {
    return this.http.patch(
      this.getUrl(url),
      data,
      {headers: new HttpHeaders().set('Authorization', 'token ' + this.token())}
    );
  }

  post(url: string = '', data: any = {}): Observable<any> {
    return this.http.post(
      this.getUrl(url),
      data,
      {headers: new HttpHeaders().set('Authorization', 'token ' + this.token())}
    );
  }

  getByParams(url: string, params: Object): Observable<any> {
    return this.http.get(
      this.getUrl(url), {headers: new HttpHeaders().set('Authorization', 'token ' + this.token())}
    );
  }

  private token() {
    return localStorage.getItem('token');
  }
}
