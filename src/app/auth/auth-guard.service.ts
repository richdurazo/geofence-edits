import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from "rxjs/Rx";

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        console.log('route', route);
        console.log('state', state);
        if(this.authService.loggedIn()) {
            return true;
        } else {
            this.authService.setUrl(state.url);
            this.router.navigate(['login']);
            return false;
        }
    }
}
