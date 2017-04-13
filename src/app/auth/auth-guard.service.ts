import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from "rxjs/Rx";

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
      console.log('this.authService', this.authService);
      if(this.authService.loggedIn()) {
          console.log('navigation true')
        return true;
      } else {
        this.authService.setUrl(state.url);
        console.log('navigation prevented')
        return false;
      }
  }
}
