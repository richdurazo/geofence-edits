import { Injectable } from '@angular/core';
import { AuthCustomHttpService } from '../../auth/auth-custom-http.service';
import 'rxjs/Rx';

import { AppSettings } from '../../app-settings';

@Injectable()
export class UserApiService {

  constructor(private authCustomHttp: AuthCustomHttpService) { }

  getUser () {
      return this.authCustomHttp.get(AppSettings.API_ROOT + '/user')
      .map(res => res.json())
  }

}
