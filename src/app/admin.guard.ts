import {Injectable} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ((localStorage.getItem('user_type') === '4' ) || (localStorage.getItem('user_type') === '5' ) ||
      (localStorage.getItem('user_type') === '3' )) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
