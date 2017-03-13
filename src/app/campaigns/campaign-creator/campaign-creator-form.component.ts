import { Component, OnInit } from '@angular/core';

import { CampaignApiService } from '../shared/campaign-api.service';
import { CampaignModel } from '../shared/campaign.model';
import { DateUtilsService } from '../../shared/date-utils.service';

@Component({
    selector: 'app-campaign-creator-form',
    templateUrl: './campaign-creator-form.component.html',
    styleUrls: ['./campaign-creator-form.component.scss']
})
export class CampaignCreatorFormComponent implements OnInit {

    campaign: CampaignModel;

    constructor (private campaignApi: CampaignApiService, private dateUtils: DateUtilsService) {}

    ngOnInit() {
        this.campaign = new CampaignModel();
        this.setModelDefaults();
        console.log('this.campaign', this.campaign);
    }

    public checkStatus (event) {
        this.campaign.status = event ? 1 : 0;
    }

    public submitForm () {
        var obj = JSON.parse(JSON.stringify(this.campaign));
        obj.start_at = this.dateUtils.formatSQLDate(obj.start_at);
        obj.end_at = this.dateUtils.formatSQLDate(obj.end_at);
        this.campaignApi.createCampaign(obj)
        .subscribe(
            data => this.processSuccess(data)
        )
    }

    processSuccess (data) {
        console.log('saved campaign data', data);
    }


    private setModelDefaults () {
        this.campaign.name = '';
        this.campaign.description = '';
        this.campaign.status = 0;
        this.campaign.start_at = new Date();
        this.campaign.end_at = new Date();
    }

}
