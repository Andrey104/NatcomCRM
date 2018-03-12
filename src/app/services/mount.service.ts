import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DealMount} from '../models/deal/deal_mount';
import {OurComment} from '../models/comment';
import {MountPage} from '../models/mount/mount-page';

@Injectable()
export class MountService {
  private urlDealMounts = 'http://188.225.46.31/api/deals/';
  private urlMount = 'http://188.225.46.31/api/mounts/';

  constructor(private http: HttpClient) {
  }

  getAllMounts(page: number): Observable<MountPage> {
    return this.http.get<MountPage>(this.urlMount, {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token()),
      params: new HttpParams().set('page', page.toString())
    });
  }

  getMounts(idDeal): Observable<DealMount[]> {
    return this.http.get<DealMount[]>(this.urlDealMounts + idDeal + '/mounts', {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token())
    });
  }

  sendComment(idMount, comment: string): Observable<OurComment> {
    return this.http.post<OurComment>(this.urlMount + idMount + '/comment/', {text: comment}, {
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
