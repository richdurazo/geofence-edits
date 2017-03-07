import { Component, OnInit } from '@angular/core';

import { CampaignModel } from '../../shared/campaign.model';

@Component({
    selector: 'app-campaign-creator',
    templateUrl: './campaign-creator.component.html',
    styleUrls: ['./campaign-creator.component.scss']
})
export class CampaignCreatorComponent implements OnInit {

    campaign: CampaignModel;

    constructor () {}

    ngOnInit() {
        console.log('this.campaign', this.campaign);
        this.campaign = {
            name: '',
            description: '',
            status: 0,
            start_at: new Date(),
            end_at: new Date()
        };
        console.log('this.campaign', this.campaign);
    }

}
