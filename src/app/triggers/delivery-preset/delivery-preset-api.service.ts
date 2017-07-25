import { AppSettings } from './../../app-settings';
import { AuthCustomHttpService } from './../../auth/auth-custom-http.service';
import { Injectable } from '@angular/core';


@Injectable()
export class DeliveryPresetApiService {

    constructor(private authCustomHttp: AuthCustomHttpService) { }

    // DeliveryPreset ACTIONS
    getDeliveryPreset (id?: string) {
        if (id) {
            return this.authCustomHttp.get(AppSettings.API_ROOT + '/delivery-preset/' + id)
            .map(res => res.json());
        } else {
            return this.authCustomHttp.get(AppSettings.API_ROOT + '/delivery-preset')
            .map(res => res.json());
        }
    }

    createDeliveryPreset (data) {
        return this.authCustomHttp.post(AppSettings.API_ROOT + '/delivery-preset', data)
        .map(res => res.json());
    }

    updateDeliveryPreset (data) {
        return this.authCustomHttp.put(AppSettings.API_ROOT + '/delivery-preset/' + data.id, data)
        .map(res => res.json());
    }

    deleteDeliveryPreset (id) {
        return this.authCustomHttp.delete(AppSettings.API_ROOT + '/delivery-preset/' + id)
        .map(res => res.json());
    }

    attachContentGroup (presetId, dataId) {
        return this.authCustomHttp.post(AppSettings.API_ROOT + '/delivery-preset/' + presetId + '/content-group/' + dataId, {})
        .map(res => res.json())
    }

}
