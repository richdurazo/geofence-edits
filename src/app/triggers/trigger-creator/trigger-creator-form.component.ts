import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CampaignModel } from '../../campaigns/shared/campaign.model';
import { CampaignApiService } from '../../campaigns/shared/campaign-api.service';

import { FilestackService } from '../../shared/filestack.service';
import { UuidApiService } from '../../shared/uuid-api.service';
import { TriggerApiService } from '../shared/trigger-api.service';
import { TriggerModel } from '../shared/trigger.model';

@Component({
    selector: 'app-trigger-creator-form',
    templateUrl: './trigger-creator-form.component.html',
    styleUrls: ['./trigger-creator-form.component.scss']
})
export class TriggerCreatorFormComponent implements OnInit {

    @Input() parentCampaign: CampaignModel;

    @Output() onCreate: EventEmitter<any> = new EventEmitter();

    trigger: TriggerModel;

    triggerMediaConfig: any;

    triggerMediaExists: boolean = false;

    triggerType: string;

    triggerCampaign: CampaignModel;

    campaigns: CampaignModel[];

    triggerTypes: [
        {
            value: "touch",
            viewValue: "Touch"
        },
        {
            value: "watermark",
            viewValue: "Audio Watermark"
        },
        {
            value: "fingerprint",
            viewValue: "Audio Fingerprint"
        },
        {
            value: "beacon",
            viewValue: "Beacon"
        }
    ];

    triggerUuid: string;

    constructor(private uuidApi: UuidApiService, private triggerApi: TriggerApiService, private campaignApi: CampaignApiService, private filestack: FilestackService) { }

    ngOnInit() {
        this.fetchUuid();

        if (!this.parentCampaign) {
            this.getCampaigns();
        }

        this.triggerTypes = [
            {
                value: "touch",
                viewValue: "Touch"
            },
            {
                value: "watermark",
                viewValue: "Audio Watermark"
            },
            {
                value: "fingerprint",
                viewValue: "Audio Fingerprint"
            },
            {
                value: "beacon",
                viewValue: "Beacon"
            }
        ];
    }

    public fetchUuid () {
        this.uuidApi.fetchUuid()
        .subscribe(
            data => {
                this.triggerUuid = data.uuid;
                this.triggerMediaConfig = this.filestack.createMediaConfig('audio-trigger', this.triggerUuid);
            }
        )
    }

    public submitForm (form) {
        if (!form.valid) {
            return;
        }
        console.log('this.trigger', this.trigger);
        var obj = Object.assign({}, this.trigger);

        this.triggerApi.createTrigger(obj)
        .subscribe(
            data => this.processSuccess(data)
        )
    }

    processSuccess (data) {
        console.log('saved trigger data', data);
        if (this.onCreate) {
            this.onCreate.emit(data);
        }
    }

    public setType (event) {
        this.triggerType = event;

        if (!this.trigger) {
            this.trigger = new TriggerModel('', event, this.triggerUuid);
        } else {
            this.trigger.type = this.triggerType;
        }

        if (this.parentCampaign) {
            this.trigger.campaign_id = this.parentCampaign.id;
        }
    }

    public setCampaign (data) {
        this.trigger.campaign_id = data.id;
        console.log('this.trigger', this.trigger);
    }

    public getCampaigns () {
        this.campaignApi.getCampaigns()
        .subscribe(
            (data) => {
                this.campaigns = data;
            }
        )
    }

}
