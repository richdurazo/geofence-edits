import { Component, OnInit } from '@angular/core';

import { CampaignModel } from '../../shared/campaign.model';

@Component({
    selector: 'app-campaign-creator-form',
    templateUrl: './campaign-creator-form.component.html',
    styleUrls: ['./campaign-creator-form.component.scss']
})
export class CampaignCreatorFormComponent implements OnInit {

    campaign: CampaignModel;

    constructor () {}

    ngOnInit() {
        this.campaign = new CampaignModel();
        this.setModelDefaults();
        console.log('this.campaign', this.campaign);
    }

    public checkStatus (event) {
        this.campaign.status = event ? 1 : 0;
    }

    public submitForm () {
        console.log('this.campaign', this.campaign);
    }

    private setModelDefaults () {
        this.campaign.name = '';
        this.campaign.description = '';
        this.campaign.status = 0;
        this.campaign.start_at = new Date();
        this.campaign.end_at = new Date();
    }

}
