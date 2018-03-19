import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DealMount} from '../models/deal/deal_mount';
import {OurComment} from '../models/comment';
import {MountPage} from '../models/mount/mount-page';
import {BaseApi} from '../core/base-api';

@Injectable()
export class MountService extends BaseApi {
  private urlDealMounts = 'http://188.225.46.31/api/deals/';
  private urlMount = 'http://188.225.46.31/api/mounts/';

  constructor(public http: HttpClient) {
    super(http);
  }

  getAllMounts(page: number, status: string): Observable<MountPage> {
    return this.get(`mounts/?page=${page.toString()}&&${status}`);
  }

  getMounts(idDeal: number): Observable<DealMount[]> {
    return this.get(`deals/${idDeal}/mounts`);
  }

  sendComment(idMount: number, comment: string): Observable<OurComment> {
    return this.post(`mounts/${idMount.toString()}/comment/`, {text: comment});
  }

  getMount(idMount: number): Observable<DealMount> {
    return this.get(`mounts/${idMount}`);
  }

  getFilterMounts(page: number, text: string) {
    return this.get(`mounts/search?text=${text}`);
  }

  mountReject(idMount: string, cause: number, comment: string): Observable<OurComment> {
    if (comment === '') {
      comment = null;
    }
    return this.post(`mounts/${idMount}/reject/`, {cause, comment});
  }

  mountComplete(idMount: string): Observable<OurComment> {
    return this.post(`mounts/${idMount}/close/`);
  }

  mountDateTransfer(idMount: string, date: string, comment: string): Observable<OurComment> {
    if (comment === '') {
      comment = null;
    }
    return this.post(`mounts/${idMount}/date/`, {date, comment});
  }
}
