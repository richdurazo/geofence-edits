import { Injectable } from '@angular/core';

@Injectable()
export class AuthMockService {

    private redirectUrl: string = '';

    constructor() {}

    // public methods
    public login (credentials, successCallback, errorCallback) {
        successCallback();
        errorCallback();
        return true;
    }

    public loggedIn () {
        return true;
    }

    public logout () {
        return true;
    }

    public setUrl (url) {
      return url;
    }

    public getRedirectUrl () {
        return true;
    }

    // // private methods
    // private processSuccess (data) {
    //     localStorage.setItem('id_token', data.token);
    // }
    //
    // private processError (error) {
    //     let new_error = JSON.parse(error._body);
    // }

}
