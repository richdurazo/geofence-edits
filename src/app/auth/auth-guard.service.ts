import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      console.log('route, state', route, state);
    if(this.authService.loggedIn()) {
      return true;
    } else {
      this.authService.setUrl(state.url);
      console.log('state.url', state.url);
    //   this.router.navigateByUrl('/login');
      return false;
    }
  }
}
