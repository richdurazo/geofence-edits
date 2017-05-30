import { Injectable } from '@angular/core';
import { AuthCustomHttpService } from '../auth/auth-custom-http.service';
import 'rxjs/Rx';
import { AppSettings } from '../app-settings';

@Injectable()
export class TargetApiService {

  constructor(private authCustomHttp: AuthCustomHttpService) { }

  fetchTargets () {
      return this.authCustomHttp.get(AppSettings.API_ROOT + '/target')
      .map(res => res.json())
  }

}
