import { Injectable } from '@angular/core';
import {DealMount} from '../models/deal/deal_mount';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {InstallerPosition} from '../models/installers/installer_position';
import {Installer} from '../models/installers/installer';
import {InstallersPage} from '../models/installers/installers_page';

@Injectable()
export class InstallersService {
  private urlInstaller = 'http://188.225.46.31/api/installers/';

  constructor(private http: HttpClient) {}
  getInstallers(): Observable<InstallersPage> {
    return this.http.get<InstallersPage>(this.urlInstaller, {
      headers: new HttpHeaders().set('Authorization', 'token ' + this.token())
    });
  }
  private token() {
    return localStorage.getItem('token');
  }
}


