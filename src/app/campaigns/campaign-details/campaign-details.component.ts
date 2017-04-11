import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CampaignApiService } from '../shared/campaign-api.service';
import { CampaignModel } from '../shared/campaign.model';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent implements OnInit {

    campaign: CampaignModel;

    id: string;

    campaignType: string;

    private sub: any;

    constructor(private route: ActivatedRoute, private campaignApi: CampaignApiService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log('this.id', this.id);

            this.getCampaign();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private getCampaign () {
        this.campaignApi.getCampaign(this.id)
        .subscribe(data => {
            this.campaign = data;
            console.log('this.campaign', this.campaign);
        });
    }


}
