import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TriggerModel } from '../../triggers/shared/trigger.model';

import { CampaignApiService } from '../shared/campaign-api.service';
import { CampaignModel } from '../shared/campaign.model';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent implements OnInit {

    campaign: CampaignModel;

    triggers: TriggerModel[];

    adding: boolean;

    id: string;

    campaignType: string;

    private sub: any;

    constructor(private route: ActivatedRoute, private campaignApi: CampaignApiService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.getCampaign();
            this.getCampaignTriggers();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private getCampaign () {
        this.campaignApi.getCampaign(this.id)
        .subscribe(data => {
            this.campaign = data;
        });
    }

    public getCampaignTriggers () {
        this.campaignApi.getCampaignTriggers(this.id)
        .subscribe(data => {
            this.triggers = data;
            console.log('this.triggers', this.triggers);
        }, error => {
            console.log('error', error);
        })
    }

    public triggerCreated (data) {
        console.log('data', data);
        this.triggers.push(data);
        this.adding = false;
    }

}
