import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import {DealPage} from '../models/deal/deals';
import {InstallersPage} from '../models/installers/installers_page';

@Injectable()
export class BrigadesService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }
}
