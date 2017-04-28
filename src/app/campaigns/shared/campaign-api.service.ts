import { Injectable } from '@angular/core';
import { AuthCustomHttpService } from '../../auth/auth-custom-http.service';
import { AppSettings } from '../../app-settings';

@Injectable()
export class CampaignApiService {

    constructor(private authCustomHttp: AuthCustomHttpService) { }

    getCampaigns () {
        return this.authCustomHttp.get(AppSettings.API_ROOT + '/campaign')
        .map(res => res.json())
    }

    getCampaign (id) {
        return this.authCustomHttp.get(AppSettings.API_ROOT + '/campaign/' + id)
        .map(res => res.json())
    }

    getCampaignTriggers (id) {
        return this.authCustomHttp.get(AppSettings.API_ROOT + '/campaign/' + id + '/triggers')
        .map(res => res.json())
    }

    createCampaign (data) {
        return this.authCustomHttp.post(AppSettings.API_ROOT + '/campaign', data)
        .map(res => res.json())
    }

    attachTrigger (campaign_id, trigger_id) {
        return this.authCustomHttp.post(AppSettings.API_ROOT + '/campaign/' + campaign_id + '/triggers/' + trigger_id, {})
        .map(res => res.json())
    }

    deleteCampaign (data) {
        return this.authCustomHttp.delete(AppSettings.API_ROOT + '/campaign/' + data.id)
        .map(res => res.json())
    }

}
