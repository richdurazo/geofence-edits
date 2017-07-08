import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { AppSettings } from '../app-settings';

@Injectable()
export class AuthApiService {
  appApi = JSON.stringify({"api_key":"b5ff4ab0-416d-11e7-80a2-e14a8bff1f26","carrier_name":"Verizon Wireless","device_identifier":"HT69J0205464","device_manufacturer":"Google","device_model":"Pixel XL","locale":"en_US","os_name":"android","os_version":"25","sdk_version":"1.0","uuid":"4669fc20-416e-11e7-a3c8-c3873b711234"});


  constructor(private http: Http) { }

  login (credentials) {
      // a bit goofy but we need a very specific format for the authentication to function properly
      // all other calls to the api will use the AuthHttp method from angular2-jwt
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers });
      let params: URLSearchParams = new URLSearchParams();
      headers.append('application-instance', `${this.appApi}`);

      params.set("email", credentials.email);
      params.set("password", credentials.password);

      return this.http.post(AppSettings.API_ROOT + '/user/login', params, options).map(res => res.json())
  }

}
