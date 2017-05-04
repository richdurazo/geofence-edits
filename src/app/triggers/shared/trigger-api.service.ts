import { Injectable } from '@angular/core';
import { AuthCustomHttpService } from '../../auth/auth-custom-http.service';
import { AppSettings } from '../../app-settings';

@Injectable()
export class TriggerApiService {

  constructor(private authCustomHttp: AuthCustomHttpService) { }

  getTriggers () {
      return this.authCustomHttp.get(AppSettings.API_ROOT + '/trigger')
      .map(res => res.json())
  }

  getTrigger (id) {
      return this.authCustomHttp.get(AppSettings.API_ROOT + '/trigger/' + id)
      .map(res => res.json())
  }

  getTriggerContentGroups (id) {
      return this.authCustomHttp.get(AppSettings.API_ROOT + '/trigger/' + id + '/content-group')
      .map(res => res.json())
  }

  createTrigger (data) {
      return this.authCustomHttp.post(AppSettings.API_ROOT + '/trigger', data)
      .map(res => res.json())
  }

  deleteTrigger (data) {
      return this.authCustomHttp.delete(AppSettings.API_ROOT + '/trigger/' + data.id)
      .map(res => res.json())
  }

  attachContentGroup (trigger_id, content_group_id) {
      return this.authCustomHttp.post(AppSettings.API_ROOT + '/trigger/' + trigger_id + '/content-group/' + content_group_id, {})
      .map(res => res.json())
  }

}
