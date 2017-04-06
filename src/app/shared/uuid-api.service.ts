import { Injectable } from '@angular/core';
import { AuthCustomHttpService } from '../auth/auth-custom-http.service';
import { AppSettings } from '../app-settings';

@Injectable()
export class UuidApiService {

  constructor(private authCustomHttp: AuthCustomHttpService) { }

  fetchUuid () {
      return this.authCustomHttp.get(AppSettings.API_ROOT + '/uuid')
      .map(res => res.json())
  }

}
