import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { AppSettings } from '../../app-settings';

@Injectable()
export class UserApiService {

  constructor(private authHttp: AuthHttp) { }

  getUser () {
      return this.authHttp.get(AppSettings.API_ROOT + 'index')
      .map(res => res.json())
  }

}
