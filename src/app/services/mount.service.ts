import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DealMount} from '../models/deal/deal_mount';
import {OurComment} from '../models/comment';
import {MountPage} from '../models/mount/mount-page';
import {BaseApi} from '../core/base-api';
import {Cost} from '../models/cost';

@Injectable()
export class MountService extends BaseApi {
  statusMount;

  constructor(public http: HttpClient) {
    super(http);
  }

  getAllMounts(page: number, status: string): Observable<MountPage> {
    return this.get(`mounts/?page=${page.toString()}&${status}`);
  }

  sendComment(idMount: number, comment: string): Observable<OurComment> {
    return this.post(`mounts/${idMount.toString()}/comment/`, {text: comment});
  }

  getMount(idMount: number): Observable<DealMount> {
    return this.get(`mounts/${idMount}/`);
  }

  getFilterMounts(page: number, text: string) {
    return this.get(`mounts/search/?page=${page}&${text}`);
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

  mountSetDate(idMount: string, date: string, comment: string): Observable<OurComment> {
    if (comment === '') {
      comment = null;
    }
    return this.post(`mounts/${idMount}/date/`, {date, comment});
  }

  mountTransfer(idMount: string, new_date: string, comment: string, cause: number): Observable<OurComment> {
    if (comment === '') {
      comment = null;
    }
    return this.post(`mounts/${idMount}/transfer/`, {new_date, comment, cause});
  }

  addCost(idMount: string, sum: number, comment: string): Observable<Cost> {
    if (comment === '') {
      comment = null;
    }
    return this.post(`mounts/${idMount}/cost/`, {sum, comment});
  }

  addCostComponent(idMount: string, sum: number, comment: string): Observable<Cost> {
    if (comment === '') {
      comment = null;
    }
    return this.post(`mounts/${idMount}/component_costs/`, {sum, comment});
  }
}
