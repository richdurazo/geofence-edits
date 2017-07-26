import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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

    @Input() trigger: TriggerModel;

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
        }, error => {
            console.log('error', error);
        })
    }

    public triggerCreated (data) {
        this.triggers.push(data);
        this.adding = false;
        this.campaignApi.attachTrigger(this.id, data.id)
            .subscribe(data => {
                console.log(data);
            }, error => {
                console.log('error', error)
            })
    }
    public triggerDeleted(data) {
        for (let trigger of this.triggers) {
            if (data === trigger.id) {
                let idx = this.triggers.indexOf(trigger);
                this.triggers.splice(idx, 1);
            }
        }
    }

}
