import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DealMount} from '../models/deal/deal_mount';
import {OurComment} from '../models/comment';
import {MountPage} from '../models/mount/mount-page';
import {BaseApi} from '../core/base-api';
import {Cost} from '../models/cost';
import {ComponentCost} from '../models/component-cost';

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
    const comment_type = 1;
    return this.post(`mounts/${idMount.toString()}/comment/`, {text: comment , comment_type});
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

  addCost(idMount: string, sum: number, comment: string, destination: number): Observable<Cost> {
    if (comment === '') {
      comment = null;
    }
    return this.post(`mounts/${idMount}/cost/`, {sum, comment, destination});
  }

  addCostComponent(idMount: string, sum: number, comment: string): Observable<Cost> {
    if (comment === '') {
      comment = null;
    }
    return this.post(`mounts/${idMount}/component_costs/`, {sum, comment});
  }

  setInstaller(idMount: string, installers: InsertPosition): Observable<any> {
    return this.post(`mounts/${idMount}/installers/`, {installers});
  }

  editComponentCost(mountId: number, costId: number, data: any): Observable<ComponentCost> {
    return this.patch(`mounts/${mountId.toString()}/component_costs/${costId.toString()}/`, data);
  }

  editCost(mountId: number, costId: number, data: any): Observable<Cost> {
    return this.patch(`mounts/${mountId}/cost/${costId}/`, data);
  }

  editMount(idMount: number, description: string, date: string): Observable<Object> {
    if (description === '') {
      description = null;
    }

    const data = {
      description,
      date
    };
    return this.put(`mounts/${idMount}/`, data);
  }
}

