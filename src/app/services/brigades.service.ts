import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import {BrigadesPage} from '../models/brigades/brigades-page';
import {Brigade} from '../models/brigades/brigade';

@Injectable()
export class BrigadesService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getBrigades(page?: string): Observable<BrigadesPage> {
    return this.getPage(`installer_groups`, page);
  }
  addBrigade(brigade: Brigade): Observable<Brigade> {
    return this.post(`installer_groups/`, brigade);
  }
  editBrigade(brigade: Brigade): Observable<Brigade> {
    return this.put(`installer_groups/${brigade.id}/`, brigade);
  }
  deleteBrigade(brigade: Brigade) {
    return this.del(`installer_groups/${brigade.id}/`);
  }
}
