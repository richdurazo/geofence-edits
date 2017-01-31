import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { RouterModule, Router } from '@angular/router';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    constructor(private http: Http, private authHttp: AuthHttp, private router: Router) {}

    login (credentials) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        let params: URLSearchParams = new URLSearchParams();
        params.set("email", credentials.email);
        params.set("password", credentials.password);

        console.log('auth service params', params);
        this.http.post('http://api.app/authenticate', params, options)
        .map(res => res.json())
        .subscribe(
            // We're assuming the response will be an object
            // with the JWT on an id_token key
            data => this.processSuccess(data),
            error => this.processError(error)
        );
    }

    processSuccess (data) {
        console.log('data', data);
        localStorage.setItem('id_token', data.token);
        this.router.navigate(['/overview']);
    }

    processError (error) {
        console.log('error', error);
        let new_error = JSON.parse(error._body);
        console.log('new_error', new_error);
        console.log('typeof new_error', typeof new_error);
        // console.log('body', body);
    }

    loggedIn() {
        return tokenNotExpired();
    }

    logout() {
        localStorage.removeItem('id_token');
    }

    logUser (data) {
        console.log('data', data);
    }

    getUser () {
        this.authHttp.get('http://api.app/index')
        .map(res => res.json())
        .subscribe(
            data => this.logUser(data)
        )
    }
}
