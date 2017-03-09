import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { AppSettings } from '../../app-settings';

@Injectable()
export class CampaignApiService {

    constructor(private authHttp: AuthHttp) { }

    getCampaigns () {
        return this.authHttp.get(AppSettings.API_ROOT + '/campaign')
        .map(res => res.json())
    }

    createCampaign (data) {
        return this.authHttp.post(AppSettings.API_ROOT + '/campaign', data)
        .map(res => res.json())
    }

}
