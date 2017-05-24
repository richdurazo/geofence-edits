import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { AuthApiService } from './auth-api.service';

@Injectable()
export class AuthService {

    private redirectUrl: string = '';

    constructor(private authApiService: AuthApiService, private router: Router) {}

    // public methods
    public loggedIn () {
        return tokenNotExpired('id_token', localStorage.getItem('id_token'));
    }

    public logOut () {
        localStorage.removeItem('id_token');
        this.router.navigate(['login']);
    }

    public setUrl (url) {
        this.redirectUrl = url;
    }

    public getRedirectUrl () {
        return this.redirectUrl;
    }

    login (credentials, successCallback, errorCallback) {
        this.authApiService.login(credentials)
        .subscribe(
            data => {
                this.processSuccess(data);
                successCallback(data);
            },
            error => {
                errorCallback(this.processError(error));
            }
        );
    }

    // private methods
    private processSuccess (data) {
        localStorage.setItem('id_token', data.token);
    }

    private processError (error) {
        return JSON.parse(error._body);
    }

}
