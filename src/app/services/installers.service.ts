import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Installer} from '../models/installers/installer';
import {InstallersPage} from '../models/installers/installers_page';
import {BaseApi} from '../core/base-api';


@Injectable()
export class InstallersService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }
  getInstallers(page?: string): Observable<InstallersPage> {
    return this.getPage(`installers/`, page);
  }
  addInstaller(installer: Installer): Observable<Installer> {
    return this.post(`installers/`, installer);
  }
  editInstaller(installers: Installer): Observable<Installer> {
    return this.put(`installers/${installers.id}/`, installers);
  }
}


