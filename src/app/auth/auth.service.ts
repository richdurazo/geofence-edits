import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class AuthService {

    constructor(private http: Http) {}

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
            data => localStorage.setItem('id_token', data.token),
            error => console.log('error', error)
        );
    }

    loggedIn() {
        return tokenNotExpired();
    }
}
