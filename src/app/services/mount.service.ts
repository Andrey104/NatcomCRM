import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DealMount} from '../models/deal/deal_mount';

@Injectable()
export class MountService {
  private urlDealMounts = 'http://188.225.46.31/api/deals/';
  private urlMount = 'http://188.225.46.31/api/mounts/';

  constructor(private http: HttpClient) {
  }

  getMounts(idDeal): Observable<DealMount[]> {
    return this.http.get<DealMount[]>(this.urlDealMounts + idDeal + '/mounts', {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token())
    });
  }
  getMount(idMount): Observable<DealMount> {
    return this.http.get<DealMount>(this.urlMount + idMount, {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token())
    });
  }
  private token() {
    return localStorage.getItem('token');
  }
}
