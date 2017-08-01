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
      return this.authCustomHttp.get(AppSettings.API_ROOT + '/delivery-preset/' + id + '/content-group')
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
/*
  attachContentGroup (trigger_id, content_group_id) {
      return this.authCustomHttp.post(AppSettings.API_ROOT + '/trigger/' + trigger_id + '/content-group/' + content_group_id, {})
      .map(res => res.json())
  }*/

  getDeliveryPreset(data) {
      return this.authCustomHttp.get(AppSettings.API_ROOT + '/delivery-preset' + data.id)
      .map(res => res.json())
    }

  getDeliveryPresets() {
      return this.authCustomHttp.get(AppSettings.API_ROOT + '/delivery-preset')
      .map(res => res.json())
    }

  createTouchTrigger (data) {
      return this.authCustomHttp.post(AppSettings.API_ROOT + '/touch', data)
      .map(res => res.json())
  }
  updateTouchTrigger(data) {
    return this.authCustomHttp.put(AppSettings.API_ROOT + '/touch/' + data.triggerable_id, data)
      .map(res => res.json())
  }
  createBeaconTrigger (data) {
      return this.authCustomHttp.post(AppSettings.API_ROOT + '/beacon', data)
      .map(res => res.json())
  }
  getBeaconTrigger(id) {
       return this.authCustomHttp.get(AppSettings.API_ROOT + '/beacon/' + id)
      .map(res => res.json());
  }
  createAudioTrigger (data) {
      return this.authCustomHttp.post(AppSettings.API_ROOT + '/audio', data)
      .map(res => res.json())
  }

  getDeliveryPresetContentGroup(data) {
      return this.authCustomHttp.get(AppSettings.API_ROOT + '/delivery-preset/' + data + '/content-group')
      .map(res => res.json())
  }

  createGeofenceTrigger(data) {
      return this.authCustomHttp.post(AppSettings.API_ROOT + '/geofence', data)
      .map(res => res.json());
  }
  getGeofences () {
      return this.authCustomHttp.get(AppSettings.API_ROOT + '/geofence')
      .map(res => res.json())
  }
  updateTrigger(data) {
    return this.authCustomHttp.put(AppSettings.API_ROOT + '/trigger/' + data.id, data)
      .map(res => res.json())
  }
  getGeofenceTrigger (id) {
      return this.authCustomHttp.get(AppSettings.API_ROOT + '/geofence/' + id)
      .map(res => res.json())
  }

}
