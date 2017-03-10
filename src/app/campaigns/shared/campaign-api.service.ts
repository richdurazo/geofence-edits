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

    createCampaign (data) {
        return this.authCustomHttp.post(AppSettings.API_ROOT + '/campaign', data)
        .map(res => res.json())
    }

    deleteCampaign (idx) {
        return this.authCustomHttp.delete(AppSettings.API_ROOT + '/campaign/' + idx)
        .map(res => res.json())
    }

}
